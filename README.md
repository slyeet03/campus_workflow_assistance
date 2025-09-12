# CampusFlow - AI-Powered Campus Workflow Assistant

An agentic AI application that automates repetitive college tasks through intelligent workflows, featuring quiz generation, smart timetable management, and transparent execution logging.

## 🚀 Features

### 📄 Quiz Generator
- **PPT/PDF Upload**: Upload lecture materials for AI analysis
- **Smart Summarization**: AI extracts key concepts and topics
- **Auto Quiz Creation**: Generates questions based on content analysis
- **Teacher Approval**: Review and modify generated questions before publishing
- **Canvas Integration**: Direct publishing to Canvas LMS with notifications

### 📅 Smart Timetable Manager
- **AI-Powered Scheduling**: Finds optimal time slots based on constraints
- **Multi-Criteria Optimization**: Considers class type, duration, and preferences
- **Conflict Detection**: Automatically avoids scheduling conflicts
- **Google Meet Integration**: Creates online meeting links for virtual classes
- **Email Notifications**: Sends meeting details to students

### 📊 Execution Logs & Transparency
- **Real-time Logging**: Track every AI action step-by-step
- **Filterable Interface**: Search by workflow, status, date, or keywords
- **Action Templates**: Define what the AI agent is allowed to do
- **Audit Trail**: Complete history of all automated actions

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with Tailwind CSS integration
- **Icons**: Emoji-based icons for modern UI
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

## 📁 Project Structure

```
campus_workflow_assistance/
├── login.html             # Login page
├── index.html             # Main dashboard (after login)
├── app.html               # Alternative dashboard
├── quiz.html              # Quiz generator interface
├── timetable.html         # Timetable management interface
├── logs.html              # Execution logs and action templates
├── src/
│   └── input.css          # Tailwind CSS source file
├── dist/
│   └── output.css         # Production CSS (generated)
├── login.js               # Login authentication logic
├── index.js               # Dashboard logic
├── app.js                 # Alternative dashboard logic
├── quiz.js                # Quiz generation logic
├── timetable.js           # Timetable management logic
├── logs.js                # Log management and filtering
├── package.json           # Node.js dependencies
├── tailwind.config.js     # Tailwind configuration
├── build.sh               # Build script
└── README.md              # Project documentation
```

## 🎯 Key Workflows

### 1. Quiz Generation Workflow
```
PPT Upload → AI Analysis → Content Summarization → 
Quiz Generation → Teacher Review → Canvas Publishing → 
Student Notifications
```

### 2. Timetable Scheduling Workflow
```
Class Requirements → AI Slot Analysis → 
Optimal Time Selection → Conflict Resolution → 
Class Scheduling → Google Meet Creation → 
Email Notifications
```

## 🎨 Design Features

### CSS Architecture
- **Modular CSS**: Organized into logical sections (navigation, forms, cards, etc.)
- **Custom Properties**: Consistent color scheme and spacing
- **Responsive Design**: Mobile-first approach with breakpoints
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Accessibility**: High contrast ratios and keyboard navigation

### UI Components
- **Progress Steps**: Visual workflow progression
- **Status Messages**: Color-coded feedback system
- **Interactive Cards**: Hover effects and smooth transitions
- **Form Elements**: Consistent styling with focus states
- **Data Tables**: Responsive timetable display

## 🚀 Getting Started

### **Option 1: Quick Start (Production Ready)**
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd campus_workflow_assistance
   ```

2. **Build the application**
   ```bash
   # Run the build script
   ./build.sh
   
   # Or manually
   npm install
   npm run build
   ```

3. **Start the application**
   ```bash
   # Simple HTTP server (Python 3)
   python -m http.server 8000
   
   # Or open directly
   open login.html
   ```

### **Option 2: Development Mode**
1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   # Watch for changes and rebuild CSS
   npm run build-css
   
   # In another terminal, start server
   python -m http.server 8000
   ```

### **Login to the application**
- Start at the login page (`login.html`)
- Use credentials: `teacher123` / `password123`
- Or create your own credentials in `login.js`

### **Navigate the application**
- Access the main dashboard after login
- Try the Quiz Generator workflow
- Test the Timetable Manager
- Check the Execution Logs for transparency

## 🔧 Customization

### CSS Styling
All styling is centralized in `app.css` for easy customization:

```css
/* Color Scheme */
:root {
  --primary-color: #3b82f6;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
}

/* Component Styling */
.card { /* Card components */ }
.btn { /* Button styles */ }
.form-input { /* Form elements */ }
```

### Adding New Workflows
1. Create new HTML page
2. Add navigation link
3. Implement JavaScript logic
4. Style with existing CSS classes

## 📱 Responsive Design

- **Mobile**: Stacked layout with touch-friendly buttons
- **Tablet**: Grid layout with optimized spacing
- **Desktop**: Full feature layout with hover effects

## 🔒 Security & Safety

- **Action Templates**: Define allowed AI actions
- **Audit Logging**: Complete action history
- **User Confirmation**: Manual approval for critical actions
- **Mock Integrations**: Safe testing environment

## 🎯 Demo Scenarios

### Scenario 1: Quiz Generation
1. Upload a Data Structures lecture PPT
2. Configure quiz parameters (10 questions, 30 minutes)
3. Review AI-generated questions
4. Make modifications if needed
5. Publish to Canvas with automatic notifications

### Scenario 2: Class Scheduling
1. Enter class details (CSE-A, Data Structures, 2 hours)
2. Let AI find optimal time slots
3. Select preferred slot from suggestions
4. Schedule class with room booking
5. Create Google Meet link for online classes

## 🚧 Future Enhancements

- **Real API Integrations**: Canvas, Google Meet, email services
- **Advanced AI**: More sophisticated content analysis
- **User Management**: Multi-user support with roles
- **Analytics Dashboard**: Usage statistics and insights
- **Mobile App**: Native mobile application

## 📄 License

This project is created for educational and demonstration purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support, please open an issue in the repository.

---

**CampusFlow** - Automating campus workflows with AI intelligence 🎓✨
