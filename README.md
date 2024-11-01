# AI Privacy Policy Analyzer - Browser (Chrome) Extension

**AI Privacy Policy Analyzer** is a Chrome extension powered by **WebLLM** that helps you understand website privacy policies. It automatically extracts privacy policies from any website and provides an AI-generated analysis to highlight key points, making it easier to comprehend complex legal language.

## Features

- **Automatic Privacy Policy Extraction**: Extracts the privacy policy text directly from the current website.
- **AI-Powered Analysis**: Uses WebLLM’s MLCEngine to analyze and summarize key points in the privacy policy.
- **Real-Time Analysis Updates**: Provides incremental updates as the analysis progresses.
- **User-Friendly Interface**: Displays easy-to-read summaries in the extension popup.

## Installation

You can install the extension using the pre-built version or by building it from source.

### Option 1: Install Pre-Built Version

1. **Download the Latest Release**

   - Go to the [Releases](https://github.com/zahidaz/ai-privacy-policy-analyzer/releases) page on GitHub.
   - Download the `ai-privacy-policy-analyzer.zip` file from the latest release.

2. **Extract the Files**

   - Locate the `ai-privacy-policy-analyzer.zip` file.
   - Right-click and select **Extract All** (Windows) or double-click to unzip (macOS).
   - Choose a destination folder for the files.

3. **Load the Extension in Chrome**

   - Open Chrome and go to `chrome://extensions/`.
   - Enable **Developer mode** by toggling the switch in the upper-right corner.
   - Click **Load unpacked** and select the extracted folder.

4. **Verify Installation**

   - The **AI Privacy Policy Analyzer** extension will appear in your extensions list, and its icon will appear in the Chrome toolbar.

### Option 2: Build from Source

1. **Clone or Download the Repository**

   ```bash
   git clone https://github.com/zahidaz/ai-privacy-policy-analyzer.git
   ```

2. **Install Dependencies**

   Ensure Node.js and npm are installed. Then, navigate to the extension directory and install dependencies:

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

   - Open Chrome and go to `chrome://extensions/`.
   - Enable **Developer mode** by toggling the switch in the upper-right corner.
   - Click **Load unpacked** and select the `dist` folder in the extension directory.

## Usage

1. **Visit a Website**: Navigate to a website whose privacy policy you want to analyze.
2. **Open the Extension**: Click the **AI Privacy Policy Analyzer** icon in the Chrome toolbar.
3. **View Analysis**:
   - The extension will extract and analyze the privacy policy text.
   - An AI-generated summary will display incremental updates in real time.
   - Once complete, a concise summary highlights essential privacy aspects.

## How It Works

- **Background Script**: Manages the AI engine and communication between content scripts and the popup.
- **Content Script**: Extracts privacy policy text from websites.
- **Popup Script**: Displays analysis to the user and handles the interface.
- **AI Module (WebLLM)**: Uses a WebLLM-powered MLCEngine with `Llama-3.2-1B-Instruct-q4f32_1-MLC` or another configured model for real-time privacy policy analysis.

## Limitations

- **AI Model Loading Time**: The AI engine may take time to load initially.
- **Accuracy**: AI-generated summaries are approximations; always refer to the original privacy policy for complete information.
- **Permissions**: Requires `tabs` and `activeTab` permissions for functionality.

## Contributing

Contributions are welcome! Follow these steps:

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

For questions or suggestions, feel free to reach out.