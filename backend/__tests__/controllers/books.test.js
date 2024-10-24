// const { bankEvent } = require("../../../controllers/admin.event.controllers");
// const { Event } = require("../../../models/event.model.js");

const {getAuthors} = require("../../controllers/authorsController.js")
const {pool} = require('../../index.js');

// Mocking the pool and connection
jest.mock('./path-to-your-database-pool', () => ({
    promise: jest.fn().mockReturnThis(),
    getConnection: jest.fn(),
}));

describe('getAuthors API', () => {
    let mockReq, mockRes, mockConnection;

    beforeEach(() => {
        // Set up mock request and response
        mockReq = {};
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mocking the database connection and query method
        mockConnection = {
            query: jest.fn(),
            release: jest.fn(),
        };

        pool.getConnection.mockResolvedValue(mockConnection);
    });

    it('should return 200 with authors when data exists', async () => {
        const authorsData = [
            { Img_url: 'image1.jpg', Author_ID: 1, Country: 'USA', Name: 'Author 1' },
            { Img_url: 'image2.jpg', Author_ID: 2, Country: 'UK', Name: 'Author 2' },
        ];

        // Mocking successful query response
        mockConnection.query.mockResolvedValue([authorsData]);

        await getAuthors(mockReq, mockRes);

        expect(mockConnection.query).toHaveBeenCalledWith(expect.any(String));
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(authorsData);
        expect(mockConnection.release).toHaveBeenCalled();
    });

    it('should return 404 when no authors are found', async () => {
        // Mocking query to return an empty array
        mockConnection.query.mockResolvedValue([[]]);

        await getAuthors(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "No authors found." });
        expect(mockConnection.release).toHaveBeenCalled();
    });

    it('should return 500 when there is an error fetching authors', async () => {
        // Mocking a failed query
        mockConnection.query.mockRejectedValue(new Error('Database error'));

        await getAuthors(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ error: "Failed to fetch authors." });
        expect(mockConnection.release).toHaveBeenCalled();
    });
});
