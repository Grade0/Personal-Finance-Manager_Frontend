"use client";
import React, { useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import TextArea from "../form/input/TextArea";
import Button from "../ui/button/Button";
import DatePicker from "@/components/form/date-picker";
import DropzoneComponent from "@/components/form/form-elements/DropZone";
import ToggleSwitch from "@/components/form/form-elements/ToggleSwitch";
import FileInput from "./input/FileInput";
import Radio from "./input/Radio";
import Switch from "./switch/Switch";


import { ChevronDown } from "lucide-react";

export default function TransactionForm() {
  const [selectedOption, setSelectedOption] = useState<string>("expense");
  const handleRadioChange = (value: string) => {
    setSelectedOption(value);
    console.log("Selected:", value);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    console.log("Switch is now:", checked ? "ON" : "OFF");
  };

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
              <div className="flex items-center gap-3">
                <Label className="m-0">Tipo Transazione:</Label>
                <div className="flex flex-wrap items-center gap-4">
                  <Radio
                    id="Free"
                    name="roleSelect"
                    value="income"
                    label="Entrata"
                    checked={selectedOption === "income"}
                    onChange={handleRadioChange}
                  />
                  <Radio
                    id="Premium"
                    name="roleSelect"
                    value="expense"
                    label="Uscita"
                    checked={selectedOption === "expense"}
                    onChange={handleRadioChange}
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Label>Conciliazione bancaria: </Label>
                <Switch
                  label="Conciliato"
                  defaultChecked={false}
                  onChange={handleSwitchChange}
                />
              </div>

              <div>
                <Label>Voce</Label>
                <Input placeholder="Enter product name" />
              </div>{" "}
              <div>
                <Label>Categoria</Label>
                <div className="relative">
                  <Select
                    options={categories}
                    placeholder="Select a category"
                    onChange={handleSelectChange}
                    defaultValue=""
                  />
                  <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                    <ChevronDown/>
                  </span>
                </div>
              </div>
              <div>
                <Label>Metodo</Label>
                <div className="relative">
                  <Select
                    options={methods}
                    placeholder="Select a method"
                    onChange={handleSelectChange}
                    defaultValue=""
                  />
                  <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                    <ChevronDown/>
                  </span>
                </div>
              </div>{" "}
              <div>
                <DatePicker
                  id="dob-picker"
                  label="Data della transazione"
                  placeholder="Select a date"
                  onChange={(dates, currentDateString) => {
                    // Handle your logic
                    console.log({ dates, currentDateString });
                  }}
                />
              </div>
              <div>
                <Label>Descrizione</Label>
                <TextArea
                  value={message}
                  onChange={(value) => setMessage(value)}
                  rows={6}
                />
              </div>

              <div className="flex flex-col gap-y-8">
                <div>
                  <Label>Upload file</Label>
                  <FileInput onChange={handleFileChange} className="custom-class" />  
                </div>
                <div className="flex items-center gap-3">
                  <Label>Conciliazione bancaria: </Label>
                  <Switch
                    label="Conciliato"
                    defaultChecked={false}
                    onChange={handleSwitchChange}
                  />
                </div>
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