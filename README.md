# **Sustainwear – Implementation Documentation**

## **1\. Project Overview**

**Sustainwear** is a platform that facilitates clothing donations from donors to charities through a responsive, user-friendly interface.

**Target Users:**

* **Donors:** Individuals or organizations donating clothing

* **Charities:** Manage incoming donations efficiently

* **Admin:** Manage user roles, permissions, and maintain the system

---

## **2\. Technology Stack**

* **Language:** TypeScript

* **Frontend:** React

* **Framework:** Next.js

* **Database:** PostgreSQL (Neon)

* **ORM:** Prisma

* **UI Library:** shadcn UI

* **Styling:** Tailwind CSS, CSS

* **Authentication:** Clerk

* **Image Uploads:** Pinata

---

## **3\. Setup Guide**

### **Step 1: Clone Repository**

`git clone https://github.com/Tammam-Al-Bahri/sustain-wear`  
`cd sustain-wear`

### **Step 2: Install Dependencies**

`npm install   # or yarn install`

### **Step 3: Database Initialization**

1. the  `.env` file with your PostgreSQL, Clerk, and Pinata API keys that was sent in the assignment submission to access our data and users, or provide your own API keys to start fresh:

```env
DATABASE_URL=                      # from database provider

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= # from clerk  
CLERK_SECRET_KEY=                  # from clerk 
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/  
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

PINATA_API_KEY=                    # from pinata  
PINATA_API_Secret=                 # from pinata  
PINATA_JWT=                        # from pinata  
NEXT_PUBLIC_GATEWAY_URL=           # from pinata
```

2. Initialize the prisma client:

`npx prisma generate`

3. Initialize the database (if using your own API keys):

`npx prisma db push`

### **Step 4: Run Locally**

`npm run dev   # or yarn dev`

App will run at [http://localhost:3000](http://localhost:3000)

### **Step 5 (optional): Log into Clerk to impersonate our users**

1. Log in to Clerk ([https://clerk.com/](https://clerk.com/)) with our credentials that were sent in the assignment submission to access the Clerk dashboard and impersonate users, in order to avoid recreating all the data. This is a test email and accounts that was created for this project only. You will be prompted for a verification code \- log in to the email account to access the code ([https://account.proton.me/mail](https://account.proton.me/mail)).

2. Click on the SustainWear application.

3. You will see all the users of the application, and you can press the three dots on the right of each user and select the “Impersonate user” option to use the application with different users of each role with their data.

4. You can also create new users by signing up within the application, and can change their roles on the admin dashboard or manually on clerk.

---

## **4\. Key Features**

* **Authentication:** Secure signup, login, logout (Clerk)

* **Donation Management:** Create and track donations

* **Charity Management:** View and manage incoming donations

* **Role-Based Access:** Donors, Charity Staff, Admin

* **Responsive UI:** Works seamlessly on desktop and mobile

* **Data Management:** Prisma handles database interactions

* **Image uploads** Pinata handles image uploads for items

---

## **5\. GitHub Repository**

* Public repo: https://github.com/Tammam-Al-Bahri/sustain-wear

* Regular commits from all members

* Feature branches used for development

