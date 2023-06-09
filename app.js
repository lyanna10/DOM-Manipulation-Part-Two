// Select and cache the <main> element in a variable named mainEl
const mainEl = document.querySelector("main");

// Set the background color of mainEl to the value stored in the --main-bg CSS custom property
mainEl.style.backgroundColor = "var(--main-bg)";

// Set the content of mainEl to <h1>DOM Manipulation</h1>
mainEl.innerHTML = "<h1>DOM Manipulation</h1>";

// Add a class of flex-ctr to mainEl
mainEl.classList.add("flex-ctr");

//Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
const topMenuEl = document.getElementById("top-menu");

//Set the height topMenuEl element to be 100%
topMenuEl.style.height = "100%";

//Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";

//Add a class of flex-around to topMenuEl
topMenuEl.classList.add("flex-around");

//Copy the following data structure to the top of app.js:
// Menu data structure
const menuLinks = [
  { text: 'about', href: '/about' },
  { text: 'catalog', href: '/catalog', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'}, ]},
  { text: 'orders', href: '/orders', subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  { text: 'account', href: '/account' , subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];

//Iterate over the entire menuLinks array and for each "link" object
menuLinks.forEach(function (link) {
  // Create an <a> element
  const newLink = document.createElement('a');

  // Add an href attribute with its value set to the href property of the "link" object
  newLink.href = link.href;

  // Set the new element's content to the value of the text property of the "link" object
  newLink.textContent = link.text;

  // Append the new element to the topMenuEl element
  topMenuEl.appendChild(newLink);
});

//Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
const subMenuEl = document.getElementById("sub-menu");

//Set the height subMenuEl element to be 100%
subMenuEl.style.height = "100%";

//Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";

//Add the class of flex-around to the subMenuEl element
subMenuEl.classList.add("flex-around");

//Set the CSS position property of subMenuEl to the value of absolute
subMenuEl.style.position = "absolute";

//Set the CSS top property of subMenuEl to the value of 0
subMenuEl.style.top = "0";

//Select and cache the all of the <a> elements inside of topMenuEl in a variable named topMenuLinks
const topMenuLinks = topMenuEl.querySelectorAll('a');

//Declare a global showingSubMenu variable and initialize it to false
let showingSubMenu = false;

//Attach a delegated 'click' event listener to topMenuEl
topMenuEl.addEventListener('click', function (evt) {

    //The first line of code of the event listener function should call the event object's preventDefault() method
    evt.preventDefault();

    //The second line of code of the function should immediately return if the element clicked was not an <a> element
    if (!evt.target.matches('a')) {
        return alert("Not <a> tag");
    }

    //console.log the content of the <a> to verify the handler is working.
    console.log(evt.target.textContent);

    //In the event listener, if the clicked <a> link has a class of active
    if (evt.target.classList.contains('active')) {
        //Remove the active class from the clicked <a> element
        evt.target.classList.remove('active');
        //Set the showingSubMenu to false
        showingSubMenu = false;
        //Set the CSS top property of subMenuEl to 0
        subMenuEl.style.top = '0';
        //return to exit the handler.
        return
    }

    //The event listener should remove a class name of active from each <a> element in topMenuLinks - whether the active class exists or not.
    topMenuLinks.forEach(function (links) {
        links.classList.remove('active');
    });
    //The event listener should add a class name of active to the <a> element that was clicked.
    evt.target.classList.add('active');
    //Set showingSubMenu to true if the clicked <a> element's "link" object within menuLinks has a subLinks property (all do, except for the "link" object for ABOUT); otherwise, set it to false.
    const showingSubMenus = menuLinks.find(function (links) {
        return links.text === evt.target.textContent.toLowerCase();
    })
    showingSubMenu = showingSubMenus && showingSubMenus.subLinks ? true : false;

    //If showingSubMenu is true
if (showingSubMenu) {
    //Call a buildSubMenu function passing to it the subLinks array for the clicked <a> element
    buildSubMenu(showingSubMenus.subLinks);
    subMenuEl.style.top = '100%'
} else {
    subMenuEl.innerHTML = '';
    subMenuEl.style.top = '0'
}
    
});


/*if (showingSubMenu) {
    buildSubMenu(!clickOnLinks.subLinks);
    subMenuEl.style.top = '0';
}*/

//Code the buildSubMenu function so that it
function buildSubMenu(subLinks) {
    //Clears the contents of subMenuEl
    subMenuEl.innerHTML = '';

    //Iterates over the subLinks array passed as an argument, and for each "link" object
    subLinks.forEach(function (links) {

        //Create an <a> element
        let aTag = document.createElement('a');

        //On the new element, add an href attribute with its value set to the href property of the "link" object
        aTag.href = links.href;

        //Set the new element's content to the value of the text property of the "link" object
        aTag.textContent = links.text;

        //Append the new element to the subMenuEl element
        subMenuEl.appendChild(aTag);
    });
}

//Attach a delegated 'click' event listener to subMenuEl
subMenuEl.addEventListener('click', function (event) {
    
    //The first line of code of the event listener function should call the event object's preventDefault() method.
    event.preventDefault();

    //The second line of code function should immediately return if the element clicked was not an <a> element.
    //The second line of code of the function should immediately return if the element clicked was not an <a> element
    if (!event.target.matches('a')) {
        return alert("Not <a> tag");
    }

    //console.log the content of the <a> to verify the handler is working.
    console.log(event.target.textContent);

    //Next, the event listener should:
    //Set showingSubMenu to false
    showingSubMenu = false;

    //Set the CSS top property of subMenuEl to 0.
    subMenuEl.style.top = '0';

    //Remove the class name of active from each <a> element in topMenuLinks - whether the active class exists or not
    topMenuLinks.forEach(function (li) {
        li.classList.remove('active');
    });

    //Update the contents of mainEl to the contents of the <a> element, within an <h1>, clicked within subMenuEl
    const liS = event.target.textContent;
    if (liS === 'ABOUT') {
        //If the ABOUT link is clicked, an <h1>About</h1> should be displayed.
        mainEl.innerHTML = '<h1>About</h1>';
    } else {
        mainEl.innerHTML = '<h1>' + liS.toUpperCase() + '</h1>';
    }

});

