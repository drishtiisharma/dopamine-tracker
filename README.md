# 🧠 Dopamine Tracker

A simple and interactive app that helps you **visualize how your daily activities affect dopamine levels** throughout the day.  
Built around the concept of **“dopamine loading”** — low-stimulation activities build your baseline, while high-stimulation ones cause short spikes followed by dips.


## ❓What It Does

Track and understand your habits in real time:
- 📊 See a live dopamine graph that updates as you adjust activities.
- ✅ Toggle activities on/off with checkboxes.
- ⏱️ Adjust activity durations (10–180 minutes) using sliders.
- 🎨 Color-coded visualization:
  - 🟢 Beneficial activities (build dopamine baseline)
  - 🟠 Detrimental activities (cause short spikes and crashes)
  - 🔵 Neutral activities (balanced impact)
- 🔁 Reset to default anytime.
- 📱 Fully responsive across devices.


## 🧩 Tech Stack

### **Frontend Framework**
- **React 18** – Component-based UI library  
- **TypeScript** – Type-safe development  
- **Vite** – Fast build tool and dev server  

### **Styling**
- **Tailwind CSS** – Utility-first styling  
- **shadcn/ui** – Pre-built, customizable UI components (Buttons, Cards, Sliders, etc.)  
- **CSS Variables (HSL)** – For theme and color control  

### **Data Visualization**
- **Recharts** – Smooth and responsive graph rendering  

### **State Management**
- **React Hooks (useState, useEffect)** – Manage and update app state  

### **Routing**
- *React Router** – (Currently single-page) navigation  

## 🧠 The Science Behind It

The app is inspired by the **neuroscience of dopamine** —  
Low-stimulation tasks like reading or meditating gradually **raise your baseline**,  
while high-stimulation tasks like gaming or scrolling **spike and crash** your dopamine levels.  
This tool helps you plan your day for **sustained motivation** and better focus.

## 🛠️ Getting Started

To run the project locally:

```bash
# Clone the repository
git clone https://github.com/drishtiisharma/dopamine-tracker

# Go into the project folder
cd dopamine-tracker

# Install dependencies
npm install

# Start the dev server
npm run dev
