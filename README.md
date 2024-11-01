# AI Privacy Policy Analyzer

**AI Privacy Policy Analyzer** is a Chrome extension that helps you understand the privacy policies of websites you visit. It automatically extracts the privacy policy from any website and provides an AI-generated analysis to highlight key points, making it easier for you to comprehend complex legal jargon.

## Features

- **Automatic Extraction**: Seamlessly extracts the privacy policy from the current website.
- **AI-Powered Analysis**: Utilizes AI to analyze and summarize the privacy policy.
- **Real-Time Updates**: Provides incremental updates as the analysis progresses.
- **User-Friendly Interface**: Easy-to-read summaries displayed directly in the extension popup.

## Installation

You can install the extension using the pre-built version or build it from source.

### Option 1: Install Pre-Built Version

1. **Download the Latest Release**

   - Navigate to the [Releases](https://github.com/yourusername/ai-privacy-policy-analyzer/releases) page on GitHub.
   - Download the `ai-privacy-policy-analyzer.zip` file from the latest release.

2. **Extract the Files**

   - Locate the downloaded `ai-privacy-policy-analyzer.zip` file.
   - Right-click and select **Extract All** (Windows) or double-click to unzip (macOS).
   - Choose a destination folder to extract the files.

3. **Load the Extension in Chrome**

   - Open Chrome and go to `chrome://extensions/`.
   - Enable **Developer mode** by toggling the switch in the upper-right corner.
   - Click on **Load unpacked**.
   - Select the folder where you extracted the extension files.

4. **Verify Installation**

   - The **AI Privacy Policy Analyzer** extension should now appear in your list of extensions.
   - A new icon representing the extension will appear in the Chrome toolbar.

### Option 2: Build from Source

1. **Clone or Download the Repository**

   ```bash
   git clone https://github.com/yourusername/ai-privacy-policy-analyzer.git
   ```

2. **Install Dependencies**

   Ensure you have Node.js and npm installed. Then, navigate to the extension directory and install dependencies:

   ```bash
   cd ai-privacy-policy-analyzer
   npm install
   ```

3. **Build the Project**

   ```bash
   npm run build
   ```

   This will generate a `dist` folder containing the built extension.

4. **Load the Extension in Chrome**

   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable **Developer mode** by toggling the switch in the upper-right corner.
   - Click on **Load unpacked** and select the `dist` folder inside the extension directory.

## Usage

1. **Visit a Website**

   Navigate to any website whose privacy policy you want to analyze.

2. **Open the Extension**

   Click on the **AI Privacy Policy Analyzer** icon in the Chrome toolbar.

3. **View Analysis**

   - The extension will automatically extract the privacy policy text.
   - An AI-generated analysis will begin and display incremental updates.
   - Once complete, you'll see a summarized analysis highlighting important aspects.

## Screenshots

**TBD**

## How It Works

- **Background Script**: Manages the loading of the AI engine and handles messages between content scripts and the popup.
- **Content Script**: Extracts the privacy policy text from the website.
- **Popup Script**: Displays the analysis to the user and handles user interface interactions.
- **AI Module**: Utilizes an AI model to analyze and summarize the privacy policy text.

## Limitations

- **AI Model Loading Time**: The AI engine may take some time to load initially.
- **Accuracy**: While the AI strives to provide accurate analyses, always refer to the original privacy policy for complete information.
- **Permissions**: The extension requires certain permissions like `tabs` and `activeTab` to function properly.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**

2. **Create a Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add your message"
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
