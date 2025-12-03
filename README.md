# Weather Forecast App

**Authors:** Lawin Khalil and Zeljka Zujic  
**Date:** 3 December 2025  
**Study Unit:** Dynamic Web Applications with Javascript TO00BL10-3028  
**Assignment:** JavaScript Project 2 - AJAX-Enabled Applications

## Project Description

This project is part of study unit Dynamic Web Applications with Javascript TO00BL10-3028A provided by Laurea UAS.In this assignment named Project-2-AJAX-Enabled Applications, the aim is to "use AJAX to fetch data from the web". This project was planned and implemented in pair work by Lawin and Zeljka representing Team 1.

Among the four choices, we decided to develop a weather forecast application built with **Vanilla JavaScript** that fetches real-time weather data from the OpenWeatherMap API. The app displays current weather conditions and a 5-day forecast for any city worldwide. A user may either input a city or then fetch weather data based on their own location.

## GitHub Repositories and Live URLs

### GitHub Repository Links

- **Lawin's GitHub repository:** https://github.com/LawinKh/Weather_App_Project_2_AJAX_Enabled_Applications

- **Zeljka's GitHub repository:** https://github.com/ZeljkaZ/Weather_App_Project_2_AJAX_Enabled_Applications

### Lawin's URLs:

- **GitHub Page Live URL:** https://lawinkh.github.io/Weather_App_Project_2_AJAX_Enabled_Applications/
- **Render Page Live URL:** https://weather-app-project-2-ajax-enabled.onrender.com/

### Zeljka's URLs:

- **GitHub Page Live URL:** https://zeljkaz.github.io/Weather_App_Project_2_AJAX_Enabled_Applications/
- **Render Page Live URL:** https://weather-app-project-2-ajax-enabled-x44i.onrender.com/

## Features

This section contains the core and extra features of the weather forecast app.

### Core Functionality

- **City Search**: A user can enter any city name to get weather information
- **Current Weather**: Displays temperature, conditions, humidity, wind speed, pressure, and visibility
- **5-Day Forecast**: The web app shows weather predictions for the next 5 days.
- **Weather Icons**: The visual weather condition icons are from OpenWeatherMap
- **Error Handling**: User-friendly error messages are added for invalid cities or network issues

### Extra Features

- **Geolocation Integration**: The app offers the functionality to detect and show weather based on the user's location. This feature requires the user's permission to work.
- **Temperature Unit Toggle**: There is the option to switch between Celsius (°C) and Fahrenheit (°F).
- **Responsive Design**: The app works seamlessly on desktop, tablet, and mobile devices.
- **Loading States**: There is a visual feedback with spinner during data fetching or loading.
- **Modern UI**: Clean, gradient-based design with smooth animations

## Technologies Used

- **HTML5**: Semantic markup with ARIA labels for accessibility
- **CSS3**: Modern styling with CSS Grid, Flexbox, gradients and minor transition animations.
- **Vanilla JavaScript**: This project does not use any external libraries. It uses vanilla JavaScript, for example, for API requests, DOM manipulation, and event handling.
- **OpenWeatherMap API**: The weather forecast web app uses OpenWeatherMap API to fetch real-time weather data.
- **Render:** Cloud platform for hosting web apps, APIs, and static sites with built-in features like automatic deployments and environment variable management.

## API Information

The API was retrieved from OpenWeatherMap.

**API Provider:** [OpenWeatherMap](https://openweathermap.org/api)

**Endpoints Used:**

1. **Current Weather**: `/data/2.5/weather` - Get current weather by city name or coordinates. Link: https://openweathermap.org/current
2. **5-Day Forecast**: `/data/2.5/forecast` - Get weather forecast for 5 days. Link: https://openweathermap.org/forecast5.

**API Key:** The weather app requires a working API key. OpenWeatherMap offers free tier API keys.

The actual API key is hidden in a file that is not pushed to GitHub repository. To use the weather forecase web application, one must locally create a file named "config.js" and place their own free API key from OpenWeatherMap in the file. Setup instructions are described in more detail below.

## Setup Instructions

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Text editor (VS Code recommended)
- OpenWeatherMap API key (free)

### Installation Steps

1. **Clone or Download the Repository**

Both cloned repositories are identical but for team work reference are added:

```bash
# Lawin's repo
git clone https://github.com/LawinKh/Weather_App_Project_2_AJAX_Enabled_Applications.git
cd Weather_App_Project_2_AJAX_Enabled_Applications
```

```bash
# Zeljka's repo
git clone https://github.com/ZeljkaZ/Weather_App_Project_2_AJAX_Enabled_Applications.git
cd Weather_App_Project_2_AJAX_Enabled_Applications
```

2. **Get Your API Key**

   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Navigate to API Keys section
   - Copy your API key

3. **API Key Setup via Deployment to Render + GitHub Pages**
   - Render is used to store your environment variables or API key securely so that when you publish GitHub page, the API key is not exposed.
   - Go to https://render.com/ and sign up/login
   - Create new "Web Service"
   - Connect the cloned GitHub repository
   - Configure:
     - **Root Directory:** backend
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Add Environment Variable:** `API_KEY` = `Your API key from OpenWeatherMap`
     - **Click "Create Web Service"** and wait for deployment
     - **Copy your Render URL:** for example, `https://weather-app-backend-xxxx.onrender.com`
     - **Paste Render URL** to `app.js` in the root directory and backend folder into `line 23`: const API_BASE_URL = "Paste Render URL here";
     - Commit new changes and push to your GitHub repository
     - Publish GitHub page in the ``Settings` and `Pages`.
     - Access your published GitHub page URL.

## How to Use the Weather Forecast Web App

### Basic Search

1. Enter a city name in the search box (such as "Helsinki", "London", "Tokyo")
2. Click the "Search" button or press Enter
3. View current weather and 5-day forecast

### Using Geolocation

1. Click the "My Location" button
2. Allow location access when prompted by browser
3. Weather data for your current location will be displayed

### Changing Temperature Unit

1. Use the toggle switch near the search bar
2. Toggle between Celsius (°C) and Fahrenheit (°F)
3. Weather data will automatically update

## Code Quality Features

This weather app is built with plain JavaScript and follows good coding practices. It uses event listeners instead of inline code, has clear comments to explain each part, and shows helpful error messages when something goes wrong. The design works well on phones and desktops, and it’s accessible with proper HTML and ARIA labels. For data, it uses an AJAX workflow: when you search or use your location, it shows a loading spinner, gets the weather data, updates the page, and lets you try again without reloading. It also handles common errors like wrong city names, network problems, missing API keys, denied location access, or empty input, so the user always knows what to do.

## Learning Outcomes

This project demonstrates proficiency in several areas, such as integrating the AJAX/Fetch API for asynchronous data fetching from REST APIs. Moreover, it showcases DOM manipulation, including creating and updating HTML elements dynamically. Additional JavaScript skills demonstrated include event handling, error handling, and more. Comprehensive documentation is provided with numerous detailed inline comments.

## Known Limitations

Everyone must retrieve their own API key and insert in their Render cloud platform to deploy web service and store environment variables and API key securely if they want to use this project for their own purposes. OpenWeatherMap API requires subscription for unlimited number of API calls.

## Future Enhancements

Potential improvements for future versions:

- [ ] Add weather alerts and warnings
- [ ] Save favorite cities to local storage
- [ ] Add weather maps and radar
- [ ] Implement hourly forecast
- [ ] Add weather charts and graphs
- [ ] Multi-language support
- [ ] Dark/Light theme toggle

## Self-Assessment (Based on Rubric)

### 1. Core Functionality and Usability (10/10 points)

The app works reliably from the public URL and provides a smooth user experience. The main user flow is clear: users can search for a city or use their current location, view both the current weather and 5-day forecast, and repeat searches without any issues. The app also shows accurate and relevant weather data, including temperature, humidity, wind, and atmospheric conditions. Invalid or empty inputs display messages to guide user on how to navigate the app (for example "Please enter a city name.") and the app does not crash. Users can change temperature units from C to F and vice versa without needing to refresh the page.

### 2. API Integration and Data Handling (8/8 points)

The app uses the OpenWeatherMap API to get current weather and 5-day forecasts. API requests are built correctly with city or coordinate parameters, units, and the API key. We parse the JSON responses and show only the selected info like temperature, weather condition, humidity, wind, and forecast, ignoring unnecessary data. In case of errors, clear messages are displayed (for example, “City not found”), so the app doesn’t crash if somethimg goes wrong. Also, data is only fetched when the user searches, uses geolocation, or changes units.

### 3. Front-end Layout and Interaction (4/5 points)

The app has a clear layout. The search input, buttons, current weather, and forecast sections are well separated, and the element the user can interact with clearly identifiable. Search results update dynamically and the loading spinner shows activity, without the need to reload the page. It works well on both wide and narrower screens, with content resizing properly, but toggle button is not responsive on smaller screens. A set of colors (primary, secondary, accent color and background colors) is used consitently.

### 4. Code Quality and Architecture (4/5 points)

The project is well-structured, with HTML, CSS, and JavaScript organized into separate files, which makes it easy for another developer or anyone who is inspecting this folder to navigate and understand. Variables and functions have meaningful names, and detailed comments are included to clarify the code logic. Functions are generally understandable and mostly easy to follow, but in some areas code could be more readable. Additionally, functions are designed to do specific tasks and are reused as well. The app also checks for missing or incorrect data, which helps it run without crashing.

### 5. Documentation (2/2 points)

Our project includes a detailed README to help others understand, run, and review the app. The README provides the live URL, clear setup and run instructions, a concise list of features, and notes about the OpenWeatherMap API used. Additionally, we included a short reflection on what we learned during development and the known limitations of the app, so anyone reviewing it can quickly understand the whole picture.

### 6. Demo Video and Git Portfolio (4/5 points)

For the project, we prepared a video presentation that explains the problem, our chosen API, the solution, and demonstrates the live app in action, following a clear and logical structure, although a bit over recommended time limit. The video will be submitted via Canvas.
Our Git repository is public and well organized, with a .gitignore file in place and no sensitive information included. Although most of our initial development was done in a private repository and on Render for practice, we created the public repository during the final stages of the project. As a result, it contains fewer commits.

**Expected Total: 32/35 points**

### Learning reflections

As a team, we are really proud of how our Weather Forecast App turned out. The app runs smoothly, and the user flow is intuitive and searching for and selecting cities works without issues, and the weather data displayed is accurate and relevant. We also made sure error handling is friendly, so if someone enters an invalid city or leaves the input blank, the app responds with clear instructions and allows retrying without refreshing the page.

We integrated the OpenWeatherMap API to get current weather and forecast data. Initially, managing the API key securely was a big learning challenge for us. We tried using a configure.js file to store the key outside the main code so it wouldn’t be exposed on GitHub. While this solution worked, it added complexity because anyone wanting to run the app needed to provide their own key. Learning about deployment on Render helped us simplify this process, and we now better understand how to keep API keys private while still making the app work reliably for users.

Although we already had experience with front-end development from other courses and extracurricular projects, this assignment gave us valuable experience in back-end integration and deployment. We learned how APIs work in practice, how to handle data safely, and how to structure requests so that the app receives the correct information and reacts appropriately to errors.

For the front end, we focused on a clean, user friendly layout with clear sections. The app is mostly responsive across different screen sizes. We did have some challenges making the toggle button fully responsive on smaller screens, but overall the design adapts well.

Overall, this project was a really interesting and rewarding learning experience. It allowed us to build on our front-end skills while gaining practical experience with back-end integration, secure API handling, and deployment.

## Contribution

This is a study unit project implemented by BIT students. Suggestions are welcome! Feel free to report bugs, suggest improvements or share feedback to further develop this web application.

## License

This project is created for educational purposes as part of a JavaScript study unit named Dynamic Web Applications with Javascript TO00BL10-3028 at Laurea University of Applied Sciences.

## Contact

**Authors:** Lawin and Zeljka  
**Study Unit:** Dynamic Web Applications with Javascript TO00BL10-3028  
**Institution:** Laurea University of Applied Sciences  
**Date:** 3 December 2025

---

## Acknowledgments

- **OpenWeatherMap** for providing free weather API
- **Study Unit Instructor** for project guidelines
- **MDN Web Docs, W3Schools and Stack Overflow** for JavaScript documentation

---

**Last Updated:** 3 December 2025
