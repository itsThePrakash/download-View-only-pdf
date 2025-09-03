Perfect 👍
Here’s a **complete GitHub-ready README.md** for your project. I’ve written it step-by-step in a way that anyone can follow easily, starting from opening a Google Drive file to running both scripts.

---

````markdown
# 📄 Google Drive Document → PDF Saver  

This repository contains two JavaScript snippets that let you download Google Drive documents (previewed as `blob:` images) into a **single high-resolution PDF file**.  

---

## 🚀 Features
- ✅ Auto-scrolls through the document to **load all pages**  
- ✅ Extracts `blob:` images from the Google Drive preview  
- ✅ Converts them into a **PDF with correct orientation** (portrait/landscape)  
- ✅ Automatically names the PDF using the document’s title  

---

## 🛠 Step-by-Step Usage  

Follow these steps carefully to generate your PDF:  

### **Step 1 — Open the File**
1. Go to your **Google Drive file**.  
2. Right-click → **Open in new window**.  
   - (This ensures the preview is shown properly.)  

---

### **Step 2 — Open Developer Tools**
1. Press **F12** (Windows/Linux) or **Option + ⌘ + I** (Mac).  
2. Go to the **Console** tab.  
3. If Chrome asks to *“allow pasting”*, type this and press **Enter**:  
   ```js
   allow pasting
````

---

### **Step 3 — Run the Auto-Scroll Script**

Paste the following code into the console and press **Enter**:

```js
/*
  Step 1: Auto-Scroll Script
  - This script forces all pages of the document to load.
*/
(function() {
    let scrollableElement = null;
    // Find the main scrollable container
    document.querySelectorAll('*').forEach(element => {
        if (element.scrollHeight > element.clientHeight) {
            if (!scrollableElement || element.scrollHeight > scrollableElement.scrollHeight) {
                scrollableElement = element;
            }
        }
    });

    if (scrollableElement) {
        console.log("Starting auto-scroll to load all pages...");
        scrollableElement.scrollTo(0, 0); // Go to the top

        let scrollInterval = setInterval(() => {
            if (scrollableElement.scrollTop + scrollableElement.clientHeight >= scrollableElement.scrollHeight) {
                clearInterval(scrollInterval);
                console.log("✅ All pages are loaded.");
                alert("Auto-scroll complete. Now run the PDF download script.");
            } else {
                scrollableElement.scrollBy(0, scrollableElement.clientHeight);
            }
        }, 500);
    } else {
        alert("No scrollable area was found. You can try to save to PDF directly with Ctrl+P.");
    }
})();
```

Wait until the script finishes and shows:

```
✅ All pages are loaded.
```

---

### **Step 4 — Run the PDF Download Script**

Now paste the following script into the console and press **Enter**:

```js
(function () {
console.log("Loading script ...");
let script = document.createElement("script");
script.onload = function () {
const { jsPDF } = window.jspdf;
let pdf = null;
let imgElements = document.getElementsByTagName("img");
let validImgs = [];
let initPDF = true;

console.log("Scanning content ...");
for (let i = 0; i < imgElements.length; i++) {
    let img = imgElements[i];
    let checkURLString = "blob:https://drive.google.com/";
    if (img.src.substring(0, checkURLString.length) !== checkURLString) continue;
    validImgs.push(img);
}

console.log(`${validImgs.length} content found!`);
console.log("Generating PDF file ...");

for (let i = 0; i < validImgs.length; i++) {
    let img = validImgs[i];
    let canvasElement = document.createElement("canvas");
    let con = canvasElement.getContext("2d");
    canvasElement.width = img.naturalWidth;
    canvasElement.height = img.naturalHeight;
    con.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
    let imgData = canvasElement.toDataURL();

    let orientation = img.naturalWidth > img.naturalHeight ? "l" : "p";
    let pageWidth = img.naturalWidth;
    let pageHeight = img.naturalHeight;

    if (initPDF) {
        pdf = new jsPDF({ orientation, unit: "px", format: [pageWidth, pageHeight] });
        initPDF = false;
    }

    if (!initPDF) {
        pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight, "", "SLOW");
        if (i !== validImgs.length - 1) pdf.addPage();
    }

    const percentages = Math.floor(((i + 1) / validImgs.length) * 100);
    console.log(`Processing content ${percentages}%`);
}

let title = document.querySelector('meta[itemprop="name"]').content;
if (title.split(".").pop() !== "pdf") title += ".pdf";

console.log("Downloading PDF file ...");
pdf.save(title, { returnPromise: true }).then(() => {
    document.body.removeChild(script);
    console.log("PDF downloaded!");
});
};

let scriptURL = "https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js";
let trustedURL;
if (window.trustedTypes && trustedTypes.createPolicy) {
    const policy = trustedTypes.createPolicy("myPolicy", { createScriptURL: (input) => input });
    trustedURL = policy.createScriptURL(scriptURL);
} else {
    trustedURL = scriptURL;
}
script.src = trustedURL;
document.body.appendChild(script);
})();
```

The PDF will automatically **download to your computer** 🎉

---

## ⚠️ Notes

* Works best for Google Drive **PDF previews**.
* Large documents → large file size.
* The script captures **images only** (no selectable text).
* Alternative: you can always use `Ctrl+P → Save as PDF`, but this method keeps **original image quality**.

---

## 📜 License

MIT License © 2025

```

---

Do you want me to also add **screenshots/demo GIF** sections in this README (like “before running script” → “after download”) so it looks polished for GitHub?
```
