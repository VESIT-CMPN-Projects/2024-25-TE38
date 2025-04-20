"use client";

import { useEffect, useState } from "react";

const SHEET_1_ID = "1hQOTX0KhWWfjPjXbJBcJp2H_YKEllK-7FhnzCf5NZXk";
const SHEET_2_ID = "1ikx60rWUGsny6ROnTarnO0G4-TWH7wkLsJoeQeTamuk";
const ACCENTURE_SHEET_ID = "1YvCwWgkzThHnXbkuS8lLjhlJ3iVguvdfERhZM_PTJ-A";
const ADOBE_SHEET_ID = "10bkNfVcCU4rMBUQ8KYptc0EBaxMt0KJswXLXc7P8Ipk";

const SHEET_1_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_1_ID}/export?format=csv`;
const SHEET_2_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_2_ID}/export?format=csv`;

const SHEET_1_URL = `https://docs.google.com/spreadsheets/d/${SHEET_1_ID}`;
const SHEET_2_URL = `https://docs.google.com/spreadsheets/d/${SHEET_2_ID}`;

export default function TableFetcher() {
  const [data1, setData1] = useState<string[][]>([]);
  const [data2, setData2] = useState<string[][]>([]);
  const [companyData, setCompanyData] = useState<string[][] | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFullTable, setShowFullTable] = useState(false);
  const [companySelected, setCompanySelected] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response1 = await fetch(SHEET_1_CSV_URL);
        const text1 = await response1.text();
        const rows1 = text1.trim().split("\n").map(row => row.split(",").map(cell => cell.trim()));

        const response2 = await fetch(SHEET_2_CSV_URL);
        const text2 = await response2.text();
        const rows2 = text2.trim().split("\n").map(row => row.split(",").map(cell => cell.trim()));

        setData1(rows1);
        setData2(rows2);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function fetchCompanyData(company: string) {
    let companySheetId = "";
    if (company === "Accenture") {
      companySheetId = ACCENTURE_SHEET_ID;
    } else if (company === "Adobe") {
      companySheetId = ADOBE_SHEET_ID;
    } else {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`https://docs.google.com/spreadsheets/d/${companySheetId}/export?format=csv`);
      const text = await response.text();
      const rows = text.trim().split("\n").map(row => row.split(",").map(cell => cell.trim()));

      setCompanyData(rows);
      setCompanySelected(company);
    } catch (error) {
      console.error("Error fetching company data:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="text-center p-4">Loading...</p>;

  return (
    <div className="p-4">
      <h1>Placement data</h1>
      <TableComponent title="Placement Students Data" sheetUrl={SHEET_1_URL} data={data1} />
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Company Offers Data</h1>
        <h2 className="text-xl font-bold mb-4">
          <a href={SHEET_2_URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Click to Open in Google Sheets
          </a>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              {data2.length > 0 && (
                <tr>
                  {data2[0].map((header, index) => (
                    <th key={index} className="border p-2 text-left">{header}</th>
                  ))}
                </tr>
              )}
            </thead>
            <tbody>
              {(showFullTable ? data2.slice(1) : data2.slice(1, 6)).map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`border p-2 ${cellIndex === 1 ? "text-blue-600 hover:underline cursor-pointer" : ""}`}
                      onClick={() => (cellIndex === 1 ? fetchCompanyData(cell) : null)}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => setShowFullTable(!showFullTable)}>
          {showFullTable ? "View Less" : "View More"}
        </button>
      </div>
      {companyData && <TableComponents title={`${companySelected} Details`} sheetUrl={`https://docs.google.com/spreadsheets/d/${companySelected === "Accenture" ? ACCENTURE_SHEET_ID : ADOBE_SHEET_ID}`} data={companyData} />}
    </div>
  );
}

function TableComponent({ title, sheetUrl, data }: { title: string; sheetUrl: string; data: string[][] }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <h2 className="text-xl font-bold mb-4">
        <a href={sheetUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          Click to Open in Google Sheets
        </a>
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            {data.length > 0 && (
              <tr>
                {data[0].map((header, index) => (
                  <th key={index} className="border p-2 text-left">{header}</th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {data.slice(1, 6).map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="border p-2">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


function TableComponents({ title, sheetUrl, data }: { title: string; sheetUrl: string; data: string[][] }) {
    return (
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <h2 className="text-xl font-bold mb-4">
          <a href={sheetUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Click to Open in Google Sheets
          </a>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              {data.length > 0 && (
                <tr>
                  {data[0].map((header, index) => (
                    <th key={index} className="border p-2 text-left">{header}</th>
                  ))}
                </tr>
              )}
            </thead>
            <tbody>
              {data.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border p-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  