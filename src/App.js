// import logo from './logo.svg';
// import './App.css';
import React, { useState, useEffect } from "react";
// import { Button } from "./button";
// import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./table";
import Papa from "papaparse";
import recipesFile from "./recipes.csv";

function App() {

    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
  
    // const handleFileUpload = (event) => {
    //   const file = event.target.files[0];
    //   console.log(file);
    //   if (!file) return;
  
    //   Papa.parse(file, {
    //     header: true,
    //     skipEmptyLines: true,
    //     complete: (result) => {
    //       console.log(result.data);
    //       setRecipes(result.data);
    //     },
    //   });
    // };

    useEffect(() => {
      fetch(recipesFile) // โหลดไฟล์ CSV จาก public/
        .then((response) => response.text())
        .then((csvText) => {
          Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
              // console.log(filteredRecipes);
              setRecipes(result.data); // เซ็ตข้อมูลจาก CSV ไปที่ state
            },
          });
        });
      });
  
    // const filteredRecipes = recipes.filter((recipe) =>
    //   recipe.Name.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    const filteredRecipes = recipes.filter((recipe) =>
      (recipe.Name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      // <div className="p-6 max-w-4xl mx-auto">
      //   <h1 className="text-2xl font-bold mb-4">Recipe CSV Viewer</h1>
      //   {/* <input type="file" accept=".csv" onChange={handleFileUpload} className="mb-4" /> */}
      //   <input
      //     type="text"
      //     placeholder="Search recipes..."
      //     value={searchTerm}
      //     onChange={(e) => setSearchTerm(e.target.value)}
      //     className="mb-4 p-2 border rounded w-full"
      //   />
      //   {filteredRecipes.length > 0 && (
      //     <Table>
      //       <TableHeader>
      //         <TableRow>
      //           <TableHead>Name</TableHead>
      //           <TableHead>Ingredients</TableHead>
      //         </TableRow>
      //       </TableHeader>
      //       <TableBody>
      //         {filteredRecipes.map((recipe, index) => (
      //           <TableRow key={index}>
      //             <TableCell>{recipe.Name}</TableCell>
      //             <TableCell>{recipe.Ingredients}</TableCell>
      //           </TableRow>
      //         ))}
      //       </TableBody>
      //     </Table>
      //   )}
        
      // </div>

      
      <div>
      <h1>Recipes</h1>

      {/* ช่องค้นหา */}
      <input
        type="text"
        placeholder="Search...."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded mb-4"
      />

      {/* ตารางแสดงข้อมูลที่ค้นหา */}
      <table border="1">
        <thead>
          <tr>
            <th>ชื่อเมนู</th>
            <th>ส่วนผสม</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe, index) => (
              <tr key={index}>
                <td>{recipe.Name || "ไม่มีข้อมูล"}</td>
                <td style={{ whiteSpace: "pre-line" }}>
                  {recipe.Ingredients.replaceAll("\\n", "\n")}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">ไม่พบเมนูที่ค้นหา</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    );
 
  
}

export default App;
