# Online Grocery Shop with Recipe Management and Meal Planning (SavorySync)

This project aims to create an online grocery shop specializing in items such as rice, lentils, and other essential groceries. The platform will enable shopkeepers to register as sellers, allowing them to list their products along with available quantities for sale. Users will benefit from a diverse range of recipes, which can be contributed by both shopkeepers and regular users. Shopkeepers’ recipes will be public by default, while users can choose to keep theirs private or share them selectively.

A key feature will be the weekly meal planning tool for users, which will facilitate meal preparation by suggesting recipes based on user preferences. Users can generate shopping lists that reflect their meal plans, ensuring they have the necessary ingredients. The platform will support online ordering from shopkeepers, allowing users to customize orders and receive deliveries via cash on delivery. After each cooking session, users will have their item quantities updated automatically based on their meal plans, with notifications sent to reorder when items run low.

This comprehensive system will foster a community of cooking enthusiasts while making grocery shopping and meal preparation seamless and efficient.

# Features

## Module 1: User and Shopkeeper Management

**1. User Registration & Profile Management:** Regular users can register and manage their profiles.

**2. Shopkeeper Registration & Profile Management:** Shopkeepers can register, manage their profiles, and verify their seller status.

**3. User Role Management:** Differentiate access and features based on user roles (regular user vs. shopkeeper).

**4. Authentication & Authorization:** Implement secure login/logout functionality, Two Factor Authentication.

**5. User Notifications:** Create a system for notifying users about important actions (e.g., order status, recipe shares).

## Module 2: Recipe Management

**1. Add Recipe:** Allow users and shopkeepers to add new recipes.

**2. Recipe Categorization:** Implement categories for easy browsing (e.g., breakfast, lunch, dinner).

**3. Recipe Search & Filter:** Users can search for recipes based on ingredients, categories, or keywords.

**4. Favorite Recipes:** Users can save recipes to a favorites list for quick access.

**5. Recipe Sharing, Reviews & Ratings:** Users will be able to share their recipe with others, and leave feedback on each other’s recipes, enhancing community interaction.

## Module 3: Meal Planning and Shopping List Management

**1. Weekly Meal Planner:** Users can plan their meals for the week, including selecting recipes for each day.

**2. Auto Generate Shopping List from Meal Plan:** Generate shopping lists based on the meal plan and quantities needed.

**3. Quantity Adjustment Post-Cooking:** Automatically update item quantities based on user meal plans after cooking.

**4. Meal Plan Suggestions:** Provide recipe suggestions based on user preferences and selected categories.

**5. Recipe Requests:** Allow users to request recipes from others within the platform.

## Module 4: Order Management

**1. Custom Item Addition:** Users can add custom items or adjust quantities in their shopping list.

**2. Online Ordering:** Users can place orders for items directly from their shopping list.

**3. Order Confirmation:** Shopkeepers can confirm orders and delivery addresses via phone calls.

**4. Order Status Tracking:** Users receive notifications regarding order status updates (confirmed, delivered).

**5. Reorder Notifications:** Alert users when items are running low based on their cooking habits and shopping list.

# Technologies Used

### Backend
  <a href="https://nodejs.org/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" alt="nodejs" width="40" height="40"/>
  </a> <b>NodeJS</b> <br>
  <a href="https://expressjs.com/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" alt="expressjs" width="40" height="40"/>
  </a> <b>ExpressJS</b>
  
### Frontend
  <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/>
  </a> <b>ReactJS</b>

### Database
  <a href="https://www.mongodb.com/docs/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" alt="mongodb" width="40" height="40"/>
  </a> <b>MongoDB</b>

# Setup Instructions

### 1. Clone the repository
Clone this repository to your local device -
```
git clone https://github.com/raufbiswas/SavorySync.git
```

### Install Nodemon
```
npm init -y
```
```
npm install nodemon -D
```

### Install ExpressJS, Mongoose, Dotenv
```
npm install express mongoose dotenv
```

### Install MongoDB
```
npm install mongodb
```

### Use to run the project(backend)
```
npm run dev
```
