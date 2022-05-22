JS lojinha

1. Creat folder structure
    1. creat root folder as jsamazona.
    2. add fronten and backend folder.
    3. creat src folder in frontend.
    4. create index.html with heading js amazona in src.
    5. run npm init in frontend folder.
    6. npm instal live-server.
    7. add start command as live-server src --verbose.
    8. run npm start.

2. Desing website
    1. create style.css.
    2. link style.css to index.html.
    3. create div.grid-container.
    4. creat header, main and footer.
    5. style html, body.
    6. srtle grid-container, header, main and footer.

3. Create Static Home Screen
    1. create ul. products.
    2. create li.
    3. create div.product.
    4. add .product-image, .product-name, .product-brand, .product-price.
    5. style ul.products and internal divs.
    6. duplicate 2 times to show 3 products.
    
4. Render Dynamic Home Screen
    1. create data.js.
    2. export an array of 6 products.
    3. create screens/HomeScreen.js.
    4. export HomeScreen as an object with render() method.
    5. implement render().
    6. import data.js.
    7. return products mapped to lis inside an ul.
    8. create app.js.
    9. link it to index.html as module;
    10. set main id to main_container.
    11. create router() function.
    12. set main_container innerHTML to HomeScreen.render().
    13. set load event of window to router() function.

5. Build Url Router
    1. create routes as route:screen object for home screen.
    2. create utils.js
    3. export parseRequestURL().
    4. set url as hash address split by slash
    5. return resource, id and verb of url.
    6. update router().
    7. set request as parseRequestURL().
    8. bild parsedUrl and compare with routes.
    9. if route exists render it else render Error404.
    10. create screens/Error404.js and render error memssage.
    
6. Create Node.JS Server
    1. run npm init in root lojinha folder
    2. npm install express
    3. create server.js
    4. add start commmand as node backend/server.js
    5. require express
    6. move data.js from frontend to backend
    7. create route for /api/products
    8. return products in data.js
    9. run npm start

7. Load Products From Backend
    1. edit HomeScreen.js
    2. make render async
    3. fetch products from 'api/products' in render().
    4. make router() async and call await HomeScreen.render()
    5. use cors on backend

8. Add Webpack
    1. cd frontend
    2. npm install -D webpack webpack-cli webpack-dev-server
    3. npm uninstall live-server
    4. "start": "webpack-dev-server --mode development --watch-content-base --open"
    5. move index.html, style.css and images to frontend folder
    6. rename app.js to index.js
    7. update index.js
    8. add <script src="main.js"></script> befor </body>
    9. npm start
    10. npm install axios
    11. change fetch to axios in HomeScreen.

9. Install Babel for ES6 Syntax
    1. npm install -D babel core, cli, node, preset-env
    2. create .babelrc and set presets to @babel/preset-env
    3. npm install -D nodemon
    4. set start: nodemon --watch backend --exec babel-node backend/server.js
    5. convert require to import in server.js
    6. npm start

11. Install VsCode Extension
    1. JavaScript (ES6) code snippets
    2. ES7 React/Redux/GraphQL/React-Native snippets
    3. Prettier - Code formatter
    4. GTML&LESS grammar injections
    5. CSS Peek.

12. Create Rating Component
    1. create components/Rating.js
    2. create div.rating
    3. link to fontawesome.css in index.html
    4. define Rating object with render().
    5. if !props.value return empty div
    6. else use fa fa-star, fa-star-half-o and fa-star-o.
    7. last span for props.test || ''.
    8. style div.rating, span and last span
    9. edit HomeScreen.
    10. Add div.product-rating and use Rating component.

13. Product Screen
    1. get product id from request
    2. implement /api/product/:id api
    3. send Ajax request to product api
    4. create back to result link
    5. create div.details with 3 columns
    6. column 1 for product image
    7. column 2 for product information
    8. column 3 for form product action
    9. style .details and all columns
    10. create add to cart button with add-button id
    11. after_render() to add event to the button 
    12. redirect user to cart/product_id

16. Add to Cart action
    1. create CartScreen.js
    2. parseRequestUrl
    3. getProduct(request.id)
    4. addToCart
    5. getCartItems
    6. carItems.find
    7. if existItem update qty
    8. else add item
    9. setCartItems

17. Cart Screen UI
    1. cartItems = getCartItems()
    2. create 2 columns for cart items and cart action
    3. cartItems.length === 0 ? cart is empty
    4. show item image, name, qty and price
    5. action
    6. subtotal
    7. proceed to checkout button
    8. add CSS STYLE

18. Update and Delete Cart Items
    1. add qty select next to each item
    2. after_render()
    3. add change event to qty select
    4. getCartItems() and pass to addToCart()
    5. set force to tue to addToCart()
    6. create rerender() as (componente, areaName = 'content')
    7. component.render and component,after_render
    8. if force is true then rerender()
    9. add delete button net to each item
    10. add click event to qty button
    11. call removeFromCart(deleteButton.id)
    12. implement removeFromCart(id)
    13. setCartItems( getCartItems().filter)
    14. if id === parseRequestUrl().id ? redirect to '/cart'
    15. else rerender(CartScreen)

19. Connect to MongoDB and Create Admin User
    1. npm install mongoose
    2. connect ro mongodb
    3. create config.js
    4. npm install dotenv
    5. export PORT and MONGODB_URL
    6. create models/userModel.js
    7. create userSchema and userModel
    8. create userRoute
    9. create createadmin route

20. Sign-in Screen UI
    1. create SigninScreen
    2. render email and password fields
    3. style signin form
    
* 21. Sign-in Screen Backend
    3. create signin api in backend
    4. create route for /api/users/signin
    5. create check user name and password
    6. if it is not ol the return 401 error
    7. install express-async-handler
    8. wrap it in expressAsyncHandler
    9. add error middleware in server.js
    10. install Postman
    11. send post request
    12. test with invalid user password
    13. otherwise generat token
    14. install jsonwebtoken
    15. set config.JWT_SECRET to somethingsecret
    16. add generateToken to utils.js
    17. return token
    18. test with correct user and password

21. Sign-in Screen Action
    1. after_render handle form submit
    2. create signin api in frontend
    3. create signin api in backend
    4. show alert if email or password is incorrect
    5. add getUserInfo and setUseriNFO to localStorage
    6. create Heater component
    7. if userInfo.email exists show user name otherwise show signin.

* 21. Create progress indicator and alert component
    1. create overlay loading div in index.html
    2. style overlay loading
    3. create showLoading() function
    4. set loading-overlay classList add active
    5. create hideLoading() function
    6. create overlay message div in index.html
    7. add style overlay message
    8. create showMessage(message, callback)
    9. document message-overlay set inner html
    10. div > div id message-overlay-content
    11. show message
    12. button id message-overlay-clsose-button
    13. add class active to it
    14. add event listener for button to call callback

22. Create Header Component
    1. update index.html
    2. add header render and after render to router function
    3. show header menu based on user logged in or not
    
23. Register Screen Action
    1. create RegisterScreen.js
    1. after_render handle form submit
    2. create register request in frontend
    3. create register api in backend

24. Create Checkout wizard Header component
    1. create component
    2. style component

25. Shipping Screen
    1. create ShippingScreen.js
    2. style elements
    3. handle form submit

26. Payment Screen
    1. creeate Payment Screen
    2. style elements
    3. handle form submit

27. Checkout Wizard
    1. create CheckoutSteps.js
    2. create div elements for step 1 to 4
    3. create redirectUser() in utils.js
    4. copy profile screem amd as shipping screen
    5. use CheckoutStep
    6. define getShipping screen and as payment screen
    7. copy shipping screen and as payment screen
    8. define getPayment and SetPayment
    9. redirect user to PlaceOrder.js

28. Place order screen UI
    1. create PlaceOrder.js
    2. style elements

29. PlaceOrder Screen Action
    1. handle place order button click
    2. createOrder api
    3. create orderModel
    4. create orderRoute
    5. create post order route

30. Order Screen
    1. create OrderScreen.js
    2. style elements

31. Paypal Payment
    1. get client id from paypal
    2. set it in .env file
    3. create route form /api/paypal/clientId
    4. create getPaypalClientID in api.js
    5. add paypal checkout script in OrderScreen.js
    6. show paypal button
    7. update order after paymeny
    8. create payOrder in api.js
    9. create route for /:id/pay in orderRouter.js
    10. rerender after pay order

32. user Order History
    1. create order History api
    2. show orders in profile screen

33. Admin Dashboar UI
    1. Header.js
    2. if user is admin show Dashboard
    3. create DashboardScreen
    4. create DashboardMenu
    5. style dashboard

34. Admin Product UI 
    1. create ProductListScreeen.js
    2. show products with edit and delete button
    3. show create product button

35. Create Product
    1. create product model
    2. implement create product route
    3. create product function in api.js
    4. call create product function in ProductListScreen
    5. redirect to edit product

34. Admin Products
    1. create admin order menu in header
    2. create ProductListScreen.js
    3. show products with edit and delete button
    4. show create product button
    5. implement create product backend
    6. redirect user to edit product screen

35. Edit product
    1. create ProductEditScreen.js
    2. load product data from backend
    3. handle form submit
    4. save product in backend
36. Delete Product
    1. update ProductListScreen.js
    2. handle delete buttom
    3. rerender after deletion

37. Upload product image
    1. npm install multer
    2. create routes/uploadRoute.js
    3. import express and multer
    4. create disk storage with Date.now().jpg as filename
    5. set upload as multer({ storage })
    6. router.post('/', upload.single('image'))
    7. return req.file.path
    8. app.use('api/uploads', uploadRoute) in server.js
    9. create uploads folder and put empty file.txt there
    10. ProductEditScreen.js
    11. create file input and set id to image-file
    12. after_render() handle image-file change
    13. create form data
    14. call uploadProductImage()
    15. create UploadProductImage in api.js
    16. update server.js

38. Delete Product
    1. update ProductListScreen.js
    2. handle delete button
    3. rerender after deletion

39. build project
    1. create build script for frontend
    2. create build script for backend
    3. update serve.js to serve frontend vuild folder and uploads folder
    4. stop running frontend
    5. npm run build
    6. check localhost:5000 for running website and showing images

40. Show Categories in Sidebar Menu
    1. update ProducListScreem.js
    2. handle delete button
    3. rerender after deletion

41. Admin orders
    1. create Admin Order menu in header
    2. create AdminOrder.js
    3. load orders from backend
    4. list them in the screen
    5. show dele and edit button
    6. redirect to order details on edit action

42. Edit order
    1. if order is payed show deliver button for admin
    2. handle click on deliver button
    3. set state to delivered

43. Delete Order
    1. update OrderListScreen.js
    2. handle delete button
    3. rerender after deletion

44. Show summary report in Dashboard
    1. create summary section
    2. style summary
    3. create summary backend
    4. create getSummary in api.js
    5. load data in dashboard screen
    6. show 3 boxes for users, orders and sales
    