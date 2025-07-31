# Isotope Education Platform - Deployment Ready! 🚀

## 🌟 Interactive Isotope Chatbot Website

An educational platform featuring AI-powered learning about isotope applications in healthcare, agriculture, industry, and research.

## ✨ Key Features

- 🤖 **AI Chatbot**: Azure OpenAI GPT-4.1 powered conversations
- 🧠 **Interactive Quizzes**: 5-question sequential quizzes with detailed feedback
- 📚 **Reliable Sources**: References from IAEA, World Nuclear Association, medical journals
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🎯 **Educational Focus**: Comprehensive isotope application information
- � **Conversation Context**: Maintains chat history for better interactions

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- Azure OpenAI service with GPT-4.1 deployment

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Azure OpenAI**
   
   Edit the `.env` file and replace `your_actual_api_key_here` with your actual Azure OpenAI API key:
   
   ```env
   AZURE_OPENAI_API_KEY=your_actual_api_key_here
   ```
   
   You can find your API key in the Azure portal:
   - Go to your Azure OpenAI resource
   - Navigate to "Keys and Endpoint"
   - Copy one of the keys

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open in browser**
   Navigate to `http://localhost:3001`

## Azure OpenAI Configuration

The application is configured to use:
- **Endpoint**: `https://hubsdk1153372211.openai.azure.com`
- **Deployment**: `gpt-4.1`
- **API Version**: `2024-12-01-preview`

## Project Structure

```
├── index.html          # Main webpage
├── styles.css          # Styling
├── script.js           # Frontend JavaScript
├── local-chatbot.mjs   # Backend server with Azure OpenAI integration
├── package.json        # Dependencies and scripts
├── .env               # Environment variables (API key)
└── README.md          # This file
```

## Usage

1. **Browse Information**: Explore the main sections about isotope applications
2. **Chat with AI**: Use the chatbot section to ask questions about isotopes
3. **Learn More**: Get detailed information about healthcare, agriculture, industrial, and research applications

## Chatbot Features

The AI assistant specializes in:
- Healthcare applications (medical imaging, cancer treatment)
- Agricultural uses (food preservation, pest control)
- Industrial applications (quality control, testing)
- Research applications (dating, analysis)
- Safety protocols and regulations

## Troubleshooting

### Common Issues

1. **"AI service not configured" error**
   - Check that your API key is correctly set in the `.env` file
   - Ensure the API key is valid and has proper permissions

2. **Connection errors**
   - Verify your internet connection
   - Check that the Azure OpenAI service is running
   - Confirm the endpoint URL is correct

3. **Server won't start**
   - Make sure Node.js is installed
   - Run `npm install` to install dependencies
   - Check that port 3001 is available

### Getting Your API Key

1. Go to the Azure portal (https://portal.azure.com)
2. Navigate to your Azure OpenAI resource
3. Go to "Keys and Endpoint" in the sidebar
4. Copy either Key 1 or Key 2
5. Paste it in the `.env` file

## Development

To modify the chatbot behavior, edit the `SYSTEM_PROMPT` in `local-chatbot.mjs`. The AI is specifically trained to discuss isotopes and their applications.

## License

This project is for educational purposes and demonstrates the integration of Azure OpenAI with web applications.
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **JavaScript (ES6+)**: Interactive functionality and animations
- **Font Awesome**: Icon library for visual elements
- **Google Fonts**: Inter font family for typography

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. The website will load with all functionality ready

### File Structure
```
isotopes-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🎯 Key Features Explained

### Atom Animation
The hero section features an animated atom with:
- Pulsing nucleus with gradient colors
- Three electrons orbiting at different speeds
- Smooth CSS animations for visual appeal

### Application Cards
Each card includes:
- Distinctive color-coded icons
- Detailed descriptions of applications
- Specific examples and use cases
- Hover effects and animations

### Chatbot System
The chatbot provides:
- Pre-programmed responses for common questions
- Keyword-based response generation
- Expandable response database
- Real-time message handling

### Responsive Design
- Mobile-first approach
- Breakpoints at 768px and 480px
- Adaptive navigation and layouts
- Optimized for all device types

## 🎨 Customization

### Colors
The website uses CSS custom properties for easy color customization:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #7c3aed;
    --accent-color: #06b6d4;
    /* ... more colors */
}
```

### Content
- Update text content in `index.html`
- Modify chatbot responses in `script.js`
- Add new application cards as needed

### Styling
- Modify `styles.css` for design changes
- Add new animations and effects
- Customize responsive breakpoints

## 🔧 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📱 Mobile Optimization

- Touch-friendly interface elements
- Optimized loading times
- Reduced motion support for accessibility
- Mobile-specific navigation

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Screen reader compatibility
- Reduced motion support

## 🚀 Performance Optimizations

- Optimized images and assets
- Efficient CSS animations
- Throttled scroll events
- Lazy loading for better performance
- Minimal JavaScript footprint

## 🔮 Future Enhancements

### Potential Additions
- **Real AI Integration**: Connect to actual AI services for chatbot
- **Database Integration**: Store user interactions and preferences
- **Multi-language Support**: Internationalization features
- **Advanced Animations**: More sophisticated visual effects
- **Progressive Web App**: PWA capabilities for mobile users

### Technical Improvements
- **Service Worker**: Offline functionality
- **API Integration**: Real-time data updates
- **Analytics**: User behavior tracking
- **SEO Optimization**: Enhanced search engine visibility

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for improvements.

## 📞 Support

For questions or support, please contact:
- Email: info@isotopetech.com
- Phone: +1 (555) 123-4567

## 🎓 Educational Purpose

This website is designed for educational purposes to help users understand:
- The role of isotopes in non-energy applications
- Safety protocols and regulations
- Real-world applications across industries
- Future trends in isotope technology

---

**Built with ❤️ for education and innovation** 