# 📚 Paper Portal - University Question Papers Repository

A modern, full-stack Next.js application for managing and accessing university question papers across multiple departments.

## 🎯 Features

### Student Features
- **📂 Folder-Style Navigation**: Browse papers organized by department, year, semester, and season
- **🔍 Advanced Filtering**: Filter papers by year, semester, and paper year
- **📥 Download Papers**: Easy PDF download functionality
- **👁️ Paper Preview**: View papers directly in the browser
- **📱 Responsive Design**: Works seamlessly on mobile and desktop

### Admin Features
- **🔐 Secure Login**: Admin authentication with email/password
- **📤 Upload Papers**: Add new papers with metadata (department, year, semester, etc.)
- **✏️ Edit Papers**: Modify paper details
- **🗑️ Delete Papers**: Remove papers from the system
- **📊 Analytics Dashboard**: View statistics and download metrics
- **📋 Manage Papers**: Filter and manage all uploaded papers

## 📁 Project Structure

```
paper-portal/
├── app/
│   ├── (departments)/
│   │   ├── cse/
│   │   │   ├── page.tsx (CSE folder navigation)
│   │   │   └── papers/page.tsx (CSE papers viewer)
│   │   ├── entc/
│   │   ├── civil/
│   │   ├── ie/
│   │   ├── mech/
│   │   └── electrical/
│   ├── admin/
│   │   ├── page.tsx (Admin login)
│   │   ├── dashboard/
│   │   │   └── page.tsx (Admin dashboard)
│   │   ├── upload/
│   │   │   └── page.tsx (Upload papers)
│   │   ├── manage/
│   │   │   └── page.tsx (Manage papers)
│   │   └── analytics/
│   │       └── page.tsx (Analytics & reports)
│   ├── layout.tsx (Root layout)
│   ├── page.tsx (Home page)
│   └── globals.css
├── components/
│   ├── NavBar.tsx
│   └── NavBar.css
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone or extract the project**
```bash
cd paper-portal
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:3000`

## 🎨 Design Features

- **Modern UI**: Clean, professional design with Tailwind CSS
- **Color-Coded Departments**: Each department has a unique color scheme
- **Smooth Animations**: Hover effects and transitions throughout
- **Dark Mode Ready**: Easy to extend with dark theme
- **Accessible**: Semantic HTML and ARIA attributes

## 👥 User Roles

### Students
- View all departments
- Browse papers by year/semester/season
- Filter papers by date
- Download PDF files
- Preview papers in browser

### Admins
- Login with credentials (demo: admin@university.edu / admin123)
- Upload new papers with metadata
- Edit existing papers
- Delete papers
- View analytics and download statistics
- Manage all papers with filtering

## 📊 Admin Dashboard

The admin dashboard includes:
- **Statistics Cards**: Total papers, departments, monthly uploads, user count
- **Quick Actions**: Upload papers, manage papers, view analytics
- **Recent Activity**: Track latest uploads and downloads

## 🔐 Authentication

### Demo Credentials
- **Email**: admin@university.edu
- **Password**: admin123

Currently uses localStorage for demo purposes. For production, implement:
- Backend authentication with sessions/JWT
- Password hashing (bcrypt)
- Database user management
- Email verification

## 📝 Adding Papers

1. Login as admin
2. Go to "Upload Paper"
3. Fill in the form:
   - Department (CSE, ENTC, Civil, IE, Mechanical, Electrical)
   - Year (1-4)
   - Semester (1-8)
   - Season (Winter/Summer)
   - Paper Year (e.g., 2025)
   - Subject Name
   - PDF File
4. Click "Upload Paper"

## 🎯 Navigation Structure

### Student Path
```
Home → Select Department → View Semesters → Select Paper Year/Season → View Papers → Download
```

### Admin Path
```
Login → Dashboard → Upload/Manage/Analytics
```

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Icons**: Lucide React
- **State Management**: React Hooks
- **Routing**: Next.js App Router

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔄 Future Enhancements

- [ ] Database integration (Supabase/Neon)
- [ ] Real file upload to cloud storage (Vercel Blob)
- [ ] User accounts and bookmarks
- [ ] Paper search functionality
- [ ] Student uploads (with admin approval)
- [ ] Email notifications
- [ ] PDF annotation tools
- [ ] Paper recommendations
- [ ] Export papers as zip
- [ ] Advanced analytics dashboard

## 🚢 Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Deploy to Other Platforms

The app works on any platform that supports Next.js:
- Netlify
- AWS Amplify
- GitHub Pages
- Self-hosted servers

## 📞 Support

For issues or questions:
1. Check the code comments
2. Review the component structure
3. Test with demo credentials

## 📄 License

This project is open source and available for educational use.

## 🎓 Educational Notes

This application demonstrates:
- ✅ Modern Next.js patterns (App Router, Server Components)
- ✅ Component composition and reusability
- ✅ Responsive design with Tailwind CSS
- ✅ State management with React Hooks
- ✅ File handling and uploads
- ✅ Authentication flow
- ✅ Complex filtering and search
- ✅ Admin dashboards and analytics

---

**Built with ❤️ for university students and administrators**
