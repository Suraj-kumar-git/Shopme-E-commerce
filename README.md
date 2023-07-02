# Shopme-E-commerce
# E-Commerce Website

This repository contains the source code for an e-commerce website built using Spring Boot, Thymeleaf, Bootstrap, and jQuery. The website includes both a customer-side and an admin-side dashboard, providing all the features expected in a normal e-commerce platform.

## Features

- User-friendly customer interface with a responsive design using Bootstrap and Thymeleaf templates.
- Seamless integration with Google and Facebook for user sign-in, enhancing the user experience and allowing for easy access.
- Role-based access control for backend users, providing different responsibilities and permissions based on their assigned roles.
- Admin panel with comprehensive features and functionalities, allowing administrators to manage products, orders, and customers efficiently.
- Sales report chart integrated using Google Chart API, providing visual representation of sales data for better analysis and decision-making.
- Used Spring Mail to send customer's email verification during registration on out website and order confirmation mail to the customers.
- Used Spring Security to store Users and Customer's password encrypted in the database. 

## Technologies Used

- Spring Boot: A Java framework for building robust and scalable web applications.
- Hibernate: The implementation of Spring Data JPA for all MySQL Database Queries.
- MySQL: Used MySQL database for storing data like users data, Brands data, Categories data, Orders, Products , Customers data etc.
- AWS S3: Later Hosted all the image files of products, users, site logo and all to the AWS S3 bucket and integerated that to the project. 
- Thymeleaf: A server-side Java template engine for rendering dynamic content in web applications.
- Bootstrap: A popular front-end framework for designing responsive and mobile-friendly web interfaces.
- jQuery: A fast, small, and feature-rich JavaScript library for simplifying client-side scripting tasks.

## Prerequisites

- Java Development Kit (JDK) 8 or higher.
- Maven: Dependency management tool for building and managing the project.
- Integrated Development Environment (IDE) of your choice, such as IntelliJ IDEA or Eclipse.

## Getting Started

1. Clone this repository: `git clone https://github.com/your-username/e-commerce-website.git`
2. Open the project in your preferred IDE.
3. Build and run the application using Maven or the IDE's build/run commands.
4. Access the customer-side dashboard by visiting: `http://localhost:80/Shopme`
5. Access the admin-side dashboard by visiting: `http://localhost:8080/ShopmeAdmin`

## Contributing

We welcome contributions to improve this e-commerce website. Feel free to open issues for bug reports or feature requests. If you would like to contribute code, please follow these steps:

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push the branch: `git push origin feature/my-new-feature`
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

