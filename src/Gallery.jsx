// // // // export function Profile(p) {
// // // //     return (
// // // //       <img className={"rounded-3xl p-4 hover:shadow-lg"}
// // // //         src="src/pic.png"
// // // //         width={p.wide? 200: 150}
// // // //         height={200}
// // // //       />
// // // //     );
// // // //   }

// // // // export default function Gallery() {
// // // //   const bird_name = "Cute One"
// // // //     return (
// // // //       <section>
// // // //         <div className="flex flex-col justify-center items-center">
// // // //         <h1 className="w-1/5 rounded-3xl p-4 text-3xl text-center">Bird: {bird_name}</h1>
// // // //         <Profile wide={false} />
// // // //         <Profile wide={false}/>
// // // //         <Profile wide={true}/>
// // // //         </div>
// // // //       </section>

// // // //     );
// // // //   }

// // // function Item({ name, isPacked }) {
// // //   // return <li className="item">{isPacked ? name + " ✅" : name}</li>;
// // //   return <li className="item">{name}{isPacked&&"✅"}</li>;

// // // }

// // // export default function PackingList() {
// // //   return (
// // //     <section>
// // //       <h1>Sally Ride's Packing List</h1>
// // //       <ul>
// // //         <Item isPacked={true} name="Space suit" />
// // //         <Item isPacked={true} name="Helmet with a golden leaf" />
// // //         <Item isPacked={false} name="Photo of Tam" />
// // //       </ul>
// // //     </section>
// // //   );
// // // }

// // import { useState } from "react";

// // const Gallery = () => {
// //   const [people, setpeople] = useState([
// //     "Creola Katherine Johnson: mathematician",
// //     "Mario José Molina-Pasquel Henríquez: chemist",
// //     "Mohammad Abdus Salam: physicist",
// //     "Percy Lavon Julian: chemist",
// //     "Subrahmanyan Chandrasekhar: astrophysicist",
// //     "Percy Lavon Julian: chemist",
// //     "Percy Lavon Julian: chemist",
// //     "Percy Lavon Julian: chemist",
// //     "Percy Lavon Julian: chemist",
// //     "Percy Lavon Julian: chemist",
// //     "Percy Lavon Julian: chemist",
// //   ]);
  
// //   const handleClick = (i) => {
// //     let newpeople = [...people];
// //     newpeople[i] = "Porumbiț";
// //     setpeople(newpeople);
// //   };

// //   return (
// //     <div className="flex flex-col justify-center items-center bg-slate-700">
// //       {people.map((x, key) => (
// //         <button
// //           key={key}
// //           className="w-1/3 p-4 m-3 rounded-xl bg-gray-800 hover:bg-gray-400 text-gray-200"
// //           onClick={() => handleClick(key)}
// //         >
// //           {x}
// //         </button>
// //       ))}
// //     </div>
// //   );
// // };

// // export default Gallery;

// import { useState } from 'react';

// export default function Counter() {
//   const [number, setNumber] = useState(0);

//   return (
//     <>
//       <h1>{number}</h1>
//       <button onClick={() => {
//         setNumber(number + 5);
//         setTimeout(() => {
//           alert(number);
//         }, 3000);
//       }}>+5</button>
//     </>
//   )
// }
