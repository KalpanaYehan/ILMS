
import bi1 from '../../public/BI1.jpg';
import bi2 from '../../public/BI2.jpg';
import bi3 from '../../public/BI3.jpg';
import bi4 from '../../public/BI4.jpg';
import bi5 from '../../public/BI5.jpg';
import bi6 from '../../public/BI6.jpg';

export const Posts = [
  {
    id: 2023,
    title: "Atomic Habits",
    author: "James Clear",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/06/Atomic_habits.jpg",
    availability: "true",
    subImages: [bi1, bi2, bi3, bi4, bi5],
    rating: 4,
    description: "In 'Atomic Habits,' James Clear provides a comprehensive guide to building good habits...",
    category: "Self-Help",
    publishDate: "2018-10-16",
    isbn: "978-0735211292"
  },
  {
    id: 2000,
    title: "Men and Dreams",
    author: "Kochery C Shibu",
    img: "https://i.pinimg.com/736x/00/aa/87/00aa8776fb28fb2b2914d9d427a711ec.jpg",
    availability: "true",
    subImages: [bi1, bi3, bi4, bi5, bi6],
    rating: 1,
    description: "Set against the backdrop of a mega construction project, 'Men and Dreams' is a tale of passion...",
    category: "Fiction",
    publishDate: "2015-07-15",
    isbn: "978-9352063566"
  },
  {
    id: 2001,
    title: "Charlotte's Web",
    author: "E B White",
    img: "https://images-na.ssl-images-amazon.com/images/I/61%2B3z1o4oUL.jpg",
    availability: "true",
    subImages: [bi1, bi3, bi4, bi5, bi6],
    rating: 2,
    description: "This heartwarming children's novel tells the story of a pig named Wilbur and his friendship...",
    category: "Children's Literature",
    publishDate: "1952-10-15",
    isbn: "978-0064400558"
  },
  {
    id: 2002,
    title: "The Lord of the Rings",
    author: "J R R Tolkien",
    img: "https://i0.wp.com/quicksilvertranslate.com/wp-content/uploads/top-books-learn-english-2.jpg",
    availability: "false",
    subImages: [bi1, bi3, bi4, bi5, bi6],
    rating: 4,
    description: "An epic fantasy adventure, 'The Lord of the Rings' follows the journey of Frodo Baggins...",
    category: "Fantasy",
    publishDate: "1954-07-29",
    isbn: "978-0544003415"
  },
  {
    id: 2003,
    title: "The Magic",
    author: "Rhonda Byrne",
    img: "https://booksbhandara.com/wp-content/uploads/2023/03/the-magic.jpg",
    availability: "true",
    subImages: [bi1, bi3, bi4, bi5, bi6],
    rating: 3,
    description: "In 'The Magic,' Rhonda Byrne reveals the life-changing power of gratitude...",
    category: "Self-Help",
    publishDate: "2012-03-06",
    isbn: "978-1451673449"
  },
  {
    id: 2004,
    title: "Solar Bones",
    author: "Mike McCormack",
    img: "https://s26162.pcdn.co/wp-content/uploads/2019/11/A1NfEjobJnL-691x1024.jpg",
    availability: "true",
    subImages: [bi1, bi3, bi4, bi5, bi6],
    rating: 3,
    description: "A unique novel written in a single sentence, 'Solar Bones' is the story of Marcus Conway...",
    category: "Literary Fiction",
    publishDate: "2016-05-05",
    isbn: "978-1786891294"
  },
  {
    id: 2005,
    title: "Harry Potter",
    author: "J K Rowling",
    img: 'https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF1000,1000_QL80_.jpg',
    availability: "false",
    subImages: [bi1, bi3, bi4, bi5, bi6],
    rating: 4,
    description: "Harry Potter is an orphaned boy who discovers on his eleventh birthday that he is a wizard...",
    category: "Fantasy",
    publishDate: "1997-06-26",
    isbn: "978-0747532699"
    
  }
];

// Update the `img` field for all posts except the one with `id: 7`
Posts.forEach(post => {
  if (post.id !== 7 && post.subImages.length > 0) {
    post.subImages[0] = post.img ;
  }
})

export default Posts;

