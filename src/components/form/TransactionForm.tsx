"use client";
import React, { useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import TextArea from "../form/input/TextArea";
import Button from "../ui/button/Button";
import DatePicker from "@/components/form/date-picker";

export default function TransactionForm() {
  const [message, setMessage] = useState("");
  const categories = [
    { value: "Affitto", label: "Laptop" },
    { value: "Phone", label: "Phone" },
    { value: "Watch", label: "Watch" },
    { value: "Electronics", label: "Electronics" },
    { value: "Accessories", label: "Accessories" },
  ];
  const methods = [
    { value: "1", label: "Apple" },
    { value: "2", label: "Samsung" },
    { value: "3", label: "LG" },
  ];
  const availability = [
    { value: "1", label: "In Stock" },
    { value: "2", label: "Out of Stock" },
  ];
  const colors = [
    { value: "1", label: "Silver" },
    { value: "2", label: "Black" },
    { value: "3", label: "White" },
    { value: "4", label: "Gray" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Dettaglio Transazione
          </h2>
        </div>
        <div className="p-4 sm:p-6 dark:border-gray-800">
          <form>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <Label>Voce</Label>
                <Input placeholder="Enter product name" />
              </div>{" "}
              <div>
                <Label>Categoria</Label>
                <Select
                  options={categories}
                  placeholder="Select a category"
                  onChange={handleSelectChange}
                  defaultValue=""
                />
              </div>
              <div>
                <Label>Metodo</Label>
                <Select
                  options={methods}
                  placeholder="Select brand"
                  onChange={handleSelectChange}
                  defaultValue=""
                />
              </div>{" "}
              <div>
                <DatePicker
                  id="dob-picker"
                  label="Data della transazione"
                  placeholder="Select an option"
                  onChange={(dates, currentDateString) => {
                    // Handle your logic
                    console.log({ dates, currentDateString });
                  }}
                />
              </div>
              <div className="col-span-full">
                <Label>Description</Label>
                <TextArea
                  value={message}
                  onChange={(value) => setMessage(value)}
                  rows={6}
                />
              </div>
                
              <div className="col-span-full">
                <Label>Receipt</Label>
                <label
                  htmlFor="product-image"
                  className="shadow-theme-xs group hover:border-brand-500 block cursor-pointer rounded-lg border-2 border-dashed border-gray-300 transition dark:hover:border-brand-400 dark:border-gray-800"
                >
                  <div className="flex justify-center p-10">
                    <div className="flex max-w-[260px] flex-col items-center gap-4">
                      <div className="inline-flex h-13 w-13 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition dark:border-gray-800 dark:text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M20.0004 16V18.5C20.0004 19.3284 19.3288 20 18.5004 20H5.49951C4.67108 20 3.99951 19.3284 3.99951 18.5V16M12.0015 4L12.0015 16M7.37454 8.6246L11.9994 4.00269L16.6245 8.6246"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium text-gray-800 dark:text-white/90">
                          Click to upload
                        </span>
                        or drag and drop SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                  </div>
                  <input type="file" id="product-image" className="hidden" />
                </label>
              </div>
              
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button variant="primary">Inserisci Transazione</Button>
      </div>
    </div>
  );
}