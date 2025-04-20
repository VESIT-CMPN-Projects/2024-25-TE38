"use client"; // Ensures this file runs on the client-side

import { useState } from "react";

const settingsOptions = [
  {
    id: 1,
    label: "Email Notifications",
    description: "Receive emails for account activity and updates",
    type: "toggle", // this could be a toggle button
  },
  {
    id: 2,
    label: "Dark Mode",
    description: "Enable dark theme for better night-time viewing",
    type: "toggle",
  },
  {
    id: 3,
    label: "Change Password",
    description: "Update your password regularly for better security",
    type: "link", // this will redirect the user to a change password page
  },
  {
    id: 4,
    label: "Language Preferences",
    description: "Select the preferred language for your account",
    type: "dropdown", // dropdown for language selection
    options: ["English", "Spanish", "French", "German"],
  },
];

const SettingsDetail = ({ setting, setSelectedSetting }: any) => {
  const handleBack = () => {
    setSelectedSetting(null);
  };

  return (
    <div className="w-full p-6 bg-white shadow-md rounded-lg">
      <button
        className="text-blue-500 hover:underline mb-4"
        onClick={handleBack}
      >
        Back to Settings
      </button>
      <h2 className="font-semibold text-xl mb-4">{setting.label}</h2>
      <p>{setting.description}</p>

      {/* Based on the type of setting, display different UI components */}
      {setting.type === "toggle" && (
        <label className="inline-flex items-center mt-4">
          <input type="checkbox" className="form-checkbox" />
          <span className="ml-2">{setting.label}</span>
        </label>
      )}

      {setting.type === "dropdown" && (
        <select className="form-select mt-4 p-2 border rounded">
          {setting.options.map((option: any) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {setting.type === "link" && (
        <button className="mt-4 p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Change Password
        </button>
      )}
    </div>
  );
};

const Settings = () => {
  const [selectedSetting, setSelectedSetting] = useState(null);

  const handleClick = (setting: any) => {
    setSelectedSetting(setting);
  };

  return (
    <div className="flex min-h-screen p-6 bg-gray-100 w-full">
      {selectedSetting ? (
        <SettingsDetail
          setting={selectedSetting}
          setSelectedSetting={setSelectedSetting}
        />
      ) : (
        <div className="flex-1 bg-white shadow-md rounded-lg divide-y divide-gray-200 overflow-y-auto w-full">
          {settingsOptions.map((setting) => (
            <div
              key={setting.id}
              className="p-4 hover:bg-gray-100 cursor-pointer flex flex-col"
              onClick={() => handleClick(setting)}
            >
              <div className="flex flex-row justify-between">
                <div className="font-semibold text-gray-900">
                  {setting.label}
                </div>
                <div className="text-gray-500">{setting.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Settings />
    </div>
  );
}
