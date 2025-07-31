# 🚀 Free Deployment Guide for Isotope Chatbot Website

## 🌟 **Best Free Hosting Options**

### **Option 1: Render (Recommended) 🥇**
**Perfect for Node.js apps with backend**

#### **Step-by-Step Deployment:**

1. **Prepare Your Code:**
   - Create a `.gitignore` file
   - Push your code to GitHub
   - Add environment variables

2. **Deploy on Render:**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure deployment:
     - **Build Command**: `npm install`
     - **Start Command**: `node local-chatbot.mjs`
     - **Environment**: Node
     - **Region**: Choose closest to your users

3. **Set Environment Variables:**
   - In Render dashboard → Environment
   - Add: `AZURE_OPENAI_API_KEY` = your API key

4. **Custom Domain (Optional):**
   - Render provides free subdomain
   - Can add custom domain on free plan

**✅ Render Benefits:**
- ✅ Free tier with 750 hours/month
- ✅ Automatic HTTPS
- ✅ Auto-deploys from GitHub
- ✅ Environment variables support
- ✅ No sleep mode issues

---

### **Option 2: Railway 🚂**
**Great for full-stack apps**

#### **Deployment Steps:**

1. **Setup:**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub
   - Click "New Project" → "Deploy from GitHub repo"

2. **Configuration:**
   - Select your repository
   - Railway auto-detects Node.js
   - Add environment variable: `AZURE_OPENAI_API_KEY`
   - Set start command: `node local-chatbot.mjs`

3. **Custom Domain:**
   - Free railway.app subdomain
   - Custom domain available

**✅ Railway Benefits:**
- ✅ $5 monthly credit (free)
- ✅ Automatic deployments
- ✅ Database support
- ✅ No cold starts

---

### **Option 3: Vercel (Frontend + Serverless) ⚡**
**Best for static sites with API routes**

#### **Required Code Changes:**
You'll need to restructure for Vercel's serverless functions.

1. **Create `vercel.json`:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/chat.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

2. **Move API to `api/chat.js`:**
   - Create `/api` folder
   - Move chat endpoint to serverless function

3. **Deploy:**
   - Go to [vercel.com](https://vercel.com)
   - Import from GitHub
   - Add environment variables
   - Deploy

**✅ Vercel Benefits:**
- ✅ Unlimited bandwidth
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Preview deployments

---

### **Option 4: Heroku (Classic Choice) 🔷**
**Traditional platform-as-a-service**

#### **Setup Steps:**

1. **Install Heroku CLI:**
   ```bash
   # Download from heroku.com/cli
   ```

2. **Prepare Your App:**
   - Create `Procfile`: `web: node local-chatbot.mjs`
   - Ensure `package.json` has start script

3. **Deploy:**
   ```bash
   heroku login
   heroku create your-app-name
   git push heroku main
   heroku config:set AZURE_OPENAI_API_KEY="your-key"
   ```

**⚠️ Heroku Limitations:**
- Free tier discontinued (paid plans only)
- Apps sleep after 30 minutes of inactivity

---

## 📁 **Required Files for Deployment**

### **1. Create `.gitignore`:**
```
node_modules/
.env
*.log
.DS_Store
```

### **2. Update `package.json`:**
```json
{
  "name": "isotope-chatbot",
  "version": "1.0.0",
  "type": "module",
  "main": "local-chatbot.mjs",
  "scripts": {
    "start": "node local-chatbot.mjs",
    "dev": "node local-chatbot.mjs"
  },
  "dependencies": {
    "express": "^5.1.0",
    "cors": "^2.8.5",
    "node-fetch": "^3.3.2",
    "dotenv": "^16.3.1"
  },
  "engines": {
    "node": "18.x"
  }
}
```

### **3. Environment Variables:**
Create `.env` file (for local development):
```
AZURE_OPENAI_API_KEY=your_api_key_here
```

---

## 🔧 **Deployment Preparation Checklist**

### **Before Deploying:**
- ✅ Test locally: `node local-chatbot.mjs`
- ✅ Create GitHub repository
- ✅ Add `.gitignore` file
- ✅ Update `package.json` with correct scripts
- ✅ Test all pages work (index.html, healthcare.html, etc.)
- ✅ Ensure environment variables are properly configured

### **GitHub Setup:**
```bash
git init
git add .
git commit -m "Initial commit - Isotope Chatbot"
git branch -M main
git remote add origin https://github.com/yourusername/isotope-chatbot.git
git push -u origin main
```

---

## 🌐 **Recommended Deployment Strategy**

### **🥇 Best Choice: Render**
**Why Render is recommended for your project:**

1. **Perfect for Your Stack:**
   - Node.js + Express backend ✅
   - Static file serving ✅
   - Environment variables ✅
   - No code changes needed ✅

2. **Free Tier Generous:**
   - 750 hours/month (enough for 24/7)
   - 512 MB RAM
   - 100 GB bandwidth

3. **Professional Features:**
   - Custom domains
   - Automatic HTTPS
   - GitHub integration
   - Zero downtime deployments

### **🥈 Alternative: Railway**
**If you need database later:**
- Built-in PostgreSQL
- More resources on free tier
- Great developer experience

---

## 📋 **Step-by-Step: Deploy to Render**

### **1. Prepare Repository:**
```bash
# In your project folder
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
git init
git add .
git commit -m "Isotope Chatbot - Ready for deployment"
```

### **2. Push to GitHub:**
- Create new repository on GitHub
- Push your code

### **3. Deploy on Render:**
1. Sign up at [render.com](https://render.com)
2. Connect GitHub account
3. Click "New +" → "Web Service"
4. Select your repository
5. Configure:
   - **Name**: isotope-chatbot
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node local-chatbot.mjs`
   - **Port**: Will auto-detect from your code (3001)

### **4. Add Environment Variables:**
- Go to Environment tab
- Add: `AZURE_OPENAI_API_KEY` = your actual API key
- Save

### **5. Deploy:**
- Click "Create Web Service"
- Wait for deployment (2-3 minutes)
- Get your live URL: `https://your-app-name.onrender.com`

---

## 🎯 **Post-Deployment Testing**

### **Test Your Live Site:**
1. **Homepage**: Check if index.html loads
2. **Navigation**: Test all page links (healthcare, agriculture, etc.)
3. **Chatbot**: Try asking questions
4. **Quiz**: Start a quiz and complete it
5. **Mobile**: Test on mobile devices

### **Common Issues & Fixes:**

**Issue**: "Application Error" on startup
**Fix**: Check environment variables and build logs

**Issue**: Chatbot not responding
**Fix**: Verify AZURE_OPENAI_API_KEY is set correctly

**Issue**: Static files not loading
**Fix**: Ensure express.static is configured properly

---

## 💡 **Pro Tips for Free Hosting**

### **Optimization Tips:**
1. **Keep App Active**: Some free services sleep after inactivity
2. **Monitor Usage**: Stay within free tier limits
3. **Optimize Images**: Compress images for faster loading
4. **Use CDN**: For better global performance

### **Scaling Later:**
- Start with Render free tier
- Upgrade when you get more traffic
- Consider migrating to Railway for database needs
- Use Vercel for eventual static site optimization

---

## 🚀 **Your Deployment Roadmap**

### **Phase 1: Quick Deploy (Today)**
1. ✅ Create GitHub repository
2. ✅ Deploy to Render
3. ✅ Test all functionality
4. ✅ Share your live URL!

### **Phase 2: Optimization (Later)**
1. Add custom domain
2. Implement caching
3. Add analytics
4. Optimize for mobile

### **Phase 3: Scale (Future)**
1. Upgrade hosting plan
2. Add database for user tracking
3. Implement user accounts
4. Add more advanced features

---

## 📞 **Need Help?**

**Deployment Support:**
- Render Documentation: [render.com/docs](https://render.com/docs)
- Railway Docs: [docs.railway.app](https://docs.railway.app)
- GitHub Issues: Create issues in your repository

**Your Live Isotope Chatbot will be available 24/7 for users worldwide! 🌍**

**Ready to deploy? Start with Render - it's the easiest path to get your amazing isotope education platform online!** 🚀
