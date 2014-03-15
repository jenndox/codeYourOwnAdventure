 // ---- Pertains to index.html code -----
function addFriend()
{
    var allAnimalOptions = "";
    for (var idx = 0; idx < animalOptions.length; idx++)
    {
        allAnimalOptions = allAnimalOptions + '<option style="background-image:url(images/' + animalOptions[idx] + '.png); background-repeat:no-repeat; background-position:right center; height:54px; min-width:180px;">' + animalOptions[idx] + "</option>";
    }
    
    var structureForNewFriend = '<div class="indentOnce">Friend <input class="variableName friendName" id="friendName' + friendCounter + '" title="name ' + friendCounter + '" placeholder="Friend number ' + (friendCounter + 1) + '" /> = new Friend( <select name="speciesFriend" id="speciesFriend" class="dropDownSelector" onchange="updateFriendAnimal(' + friendCounter + ', this.value);">' + allAnimalOptions + '</select> );</div></div>';
  
    jQuery("#friendsSection").append(structureForNewFriend);
    
    var nameElement = document.getElementById("friendName" + friendCounter );
    
    if ( nameElement.addEventListener ) {
        nameElement.addEventListener("focus", nameFocus, false);
        nameElement.addEventListener("blur", nameBlur, false);
    } else if ( nameElement.attachEvent ) {
        nameElement.attachEvent("onfocus", nameFocus);
        nameElement.attachEvent("onblur", nameBlur);
    }
    
    // Add the friend to our list.
    var friendData = new Array(2);
    friendData[0] = "Friend number " + (friendCounter + 1) ;
    friendData[1] = animalOptions[0];
    friends.push(friendData);
    friendCounter++;
    
    if (friendCounter >= maxFriends)
    {

        jQuery("#friendAdder").hide();
    }
}

function updateFriendAnimal(friendIndex, value)
{
   friends[friendIndex][1] = value;
}

function updateHome(value)
{
   home = value;
}

function saveValues()
{
   writeCookies();
   window.location.href = "book.html";
}

function writeCookies()
{
   document.cookie = "friendsCount=" + friends.length + ";";
   
   for (var index=0; index < friends.length; index++)
   {
        document.cookie = "friendsName" + index + "=" + friends[index][0] + ";";
        document.cookie = "friendsSpecies" + index + "=" + friends[index][1] + ";";
   }
   
   document.cookie = "bookTitle=" + bookTitle + ";";
   document.cookie = "authorName=" + authorName + ";";
   document.cookie = "home=" + home + ";";
   document.cookie = "weather=" + weather + ";";
}

function nullifyCookies()
{
   document.cookie = "friendsCount=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
   
   for (var index=0; index < maxFriends; index++)
   {
        document.cookie = "friendsName" + index + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.cookie = "friendsSpecies" + index + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
   }
   
   document.cookie = "bookTitle=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
   document.cookie = "authorName=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
   document.cookie = "home=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
   document.cookie = "weather=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}


function resetValues()
{
   nullifyCookies();
   
   // Reset to default values.
   friendCounter = 0;
   friends = [];
   
   bookTitle = "My Book's Title";
   authorName = "You Name";
   home = "cave";
   
   weatherIndex = Math.floor(Math.random() * weatherOptions.length); 
   weather = weatherOptions[weatherIndex];

   location.reload();
}

function configureEventHandlers()
{
   // bookTitle
    var titleElement = document.getElementById("bookTitle");
    if ( titleElement.addEventListener ) {
        titleElement.addEventListener("focus", bookTitleFocus, false);
        titleElement.addEventListener("blur", bookTitleBlur, false);
    } else if ( titleElement.attachEvent ) {
        titleElement.attachEvent("onfocus", bookTitleFocus);
        titleElement.attachEvent("onblur", bookTitleBlur);
    }
    
    // authorName
    var authorElement = document.getElementById("authorName");
    if ( authorElement.addEventListener ) {
        authorElement.addEventListener("focus", authorNameFocus, false);
        authorElement.addEventListener("blur", authorNameBlur, false);
    } else if ( authorElement.attachEvent ) {
        authorElement.attachEvent("onfocus", authorNameFocus);
        authorElement.attachEvent("onblur", authorNameBlur);
    }
}

function bookTitleFocus( e ) {
   var element = e.target || window.event.srcElement;
   if (element.value == "My Book's Title")
   {
        element.value = "";
   }
}

function bookTitleBlur( e ) {
   var element = e.target || window.event.srcElement;
   if (element.value == "")
   {
        element.value = "My Book's Title";
   }
   else
   {
        bookTitle = element.value;
   }
}

function authorNameFocus( e ) {
   var element = e.target || window.event.srcElement;
   if (element.value == "Your Name")
   {
        element.value = "";
   }
}

function authorNameBlur( e ) {
   var element = e.target || window.event.srcElement;
   if (element.value == "")
   {
        element.value = "Your Name";
   }
   else
   {
        authorName = element.value;
   }
}

function nameFocus( e ) {
   var elementName = e.currentTarget.id;
   var friendIndex = elementName.substring(10, elementName.length);
   var element = e.target || window.event.srcElement;
   if (element.value == "Friend number " + (friendCounter + 1)) element.value = "";
}

function nameBlur( e ) {
   var elementName = e.currentTarget.id;
   var friendIndex = elementName.substring(10, elementName.length);
   
   var element = e.target || window.event.srcElement;
   if (element.value == "")
   {
        element.value = "Friend number " + (friendCounter + 1);
   }
   else
   {
        friends[friendIndex][0] = e.currentTarget.value;
   }
}

// ---- Pertains to book.html code -----

// Set up and render the first page.
function firstPage()
{
    parseCookies();
    
    // Update the title.
    document.title = fields["bookTitle"];
    
    jQuery("#titleRegion").html('<div id="title" class="titleText">' + fields["bookTitle"] + '</div><div id="author" class="authorText">by ' + fields["authorName"] + '</div>');
    jQuery("#titleRegion").show();
    
    // Make the book. Define strings for pages after we parse the cookie data.
    pages.push('<div id="mainBody" class="newSegment">The little ' + fields["friendsSpecies0"] + ', <div style="background-image:url(' + fields["friendsSpecies0"] +  '.png); background-repeat:no-repeat; background-position:center; height:50px; width:60px; display:inline-block; margin:3px;"/> <div class="friendNames">' + fields["friendsName0"] + '</div>, was napping in a hammock by ' + mainCharPosessive + ' ' + fields["home"] + ' on a fine ' + fields["weather"] + ' day.</div>');
    
    var allNamesCombined = '<div class="friendNames"><div style="background-image:url(' + fields["friendsSpecies0"] +  '.png); background-repeat:no-repeat; background-position:center; height:50px; width:60px; display:inline-block; margin:3px;"/> <div class="friendNames">' + fields["friendsName0"] + '</div>';
    
    // Second page may have the friends join.
    if (fields["friendsCount"] > 1)
    {
        var friendsNamesCombined = '<div style="background-image:url(' + fields["friendsSpecies1"] +  '.png); background-repeat:no-repeat; background-position:center; height:50px; width:60px; display:inline-block; margin:3px;"/>' + fields["friendsName1"];
        for (var idx = 2; idx < fields["friendsCount"]; idx++)
        {
            friendsNamesCombined += " and " + '<div style="background-image:url(' + fields["friendsSpecies" + idx] +  '.png); background-repeat:no-repeat; background-position:center; height:50px; width:60px; display:inline-block; margin:3px;"/>' + fields["friendsName" + idx];
        }
        allNamesCombined += " and " + friendsNamesCombined + "</div>";
        pages.push('<div id="mainBody" class="newSegment"><div class="friendNames">' + friendsNamesCombined + ' </div>came by the  ' + fields["home"] + ' to see if ' + mainCharPronoun + ' could play. What adventure would they go on today?</div>');
    }
    else
    {
     pages.push('<div id="mainBody" class="newSegment">No one was around, but that was okay. <div style="background-image:url(' + fields["friendsSpecies0"] +  '.png); background-repeat:no-repeat; background-position:center; height:50px; width:60px; display:inline-block; margin:3px;"/> <div class="friendNames">' + fields["friendsName0"] + '</div> had a great imagination. What kind of adventure would ' + mainCharPronoun + ' go on today?</div>');
    }
  
    // Soar to the clouds.
    pages.push('<div id="mainBody" class="newSegment">Fly up to the clouds where the angels live, way up in the sky soared ' + allNamesCombined + '.</div>');
    
    // Swim in the sea.
    pages.push('<div id="mainBody" class="newSegment">Dive down into the depths of the sea to say hello to a friendly shark from school. Swim down, ' + allNamesCombined + '</div>');
    
    // Jump to space.
    pages.push('<div id="mainBody" class="newSegment">' + allNamesCombined + ' jump so high they jumped into space and flew past the moon.</div>');
    
    
    // Caught by an eagle.
    pages.push('<div id="mainBody" class="newSegment">' + allNamesCombined + ' fell back down and were caught by a giant eagle with big eyes and a sharp beak.</div>');
    
    // Explore a cave.
    pages.push('<div id="mainBody" class="newSegment">' + allNamesCombined + ' hike through the forest and find a cave. It is so dark that they run back out. They run home fast to tell about the big adventure.</div>');
    
    // Last page.
    pages.push('<div id="mainBody" class="newSegment">Good night, ' + allNamesCombined + "! It is time to sleep.</div></div></div>");
    
    // Render the first page.
    jQuery("#results").html(pages[0]);
}

// Get the data we stored in cookies to use in the story.
function parseCookies()
{
    var params = cookieData.split(";");
    
    if (!(params === undefined) && (params.length > 0) && (params != ""))
    {
        for (var idx = 0; idx < params.length; idx++)
        {
            var field = params[idx].split("=");
      
            fields[field[0].trim()] = field[1].trim();
        }
    }
    
    if (fields["bookTitle"] === undefined)
    {
        // It seems we cannot find the data, so go back to index.
       // window.location = "index.html";
    }
}

// Each page that is not the first or the last.
function nextPage()
{
    pageReading++;
    clearCanvas();
    
    jQuery("#titleRegion").hide();
    if (pageReading < pages.length - 1)
    {
        jQuery("#results").html(pages[pageReading]);
    }
    else
    {
        lastPage();
    }
}

// The last page.
function lastPage()
{
    jQuery("#results").html(pages[pageReading] + '<div id="theEnd" class="newSegment">The End.</div>');
    
    jQuery("#nextPage").hide();
    jQuery("#startOver").show();
    jQuery("#makeANewBook").show();
}

// Start the book from the beginning.
function startOver()
{
    pageReading = 0;
    
    // Render the first page.
    jQuery("#results").html(pages[0]);
    
    jQuery("#nextPage").show();
    jQuery("#startOver").hide();
    jQuery("#makeANewBook").hide();
}

function makeANewBook()
{
    window.location.href = "index.html";
}

// trims the leading and proceeding white-space
String.prototype.trim = function()
{
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};

// ---- Pertains to data management code -----


// ----- Code for the drawing surface ------
var leftMouseDown = false;
var mouseDelta = 0;
var ctrlDown = false;
var shiftDown = false;

var selectedElement = null;

var handlers = {};
    
function setUpDrawingArea()
{
    mainCanvas = document.getElementById('drawAdventure');
    if(mainCanvas.getContext)
    {
        ctx = mainCanvas.getContext('2d');
        mainCanvas.onresize = function() {
        };
        setupInputHandlers(ctx);
     
        ctx.globalCompositeOperation = "source-over";
     
        ctx.fillStyle = penColor;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowColor = "gray";
    }
}

function clearCanvas()
{
    ctx.clearRect(0, 0, 900, 300);
}

function setCursor(canvas, name) {
    switch (name) {
        case null:
        case "":
        case "default":
        case "arrow":
            canvas.style.cursor = "";
            break;
        case "hand":
            canvas.style.cursor = "pointer";
            break;
    }
}

function setupInputHandlers() {

    handlers.onMouseDown = function (button, x, y, el) {
        y -= $("#drawAdventureContainer").offset().top - 20;;
        leftMouseDown = true;
        setCursor(mainCanvas, "hand");
        lastMouseX = x;
        lastMouseY = y;

        ctx.fillStyle = penColor;
        ctx.strokeStyle = penColor;
        ctx.moveTo(x,y);
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI*2, true);
        ctx.fill();
    }

    handlers.onMouseUp = function (button, x, y, el) {
        leftMouseDown = false;
        setCursor(mainCanvas, null);
    }

    handlers.onMouseMove = function (x, y) {
        y -= $("#drawAdventureContainer").offset().top - 20;;
        if (leftMouseDown == true) {
            ctx.fillStyle = penColor;
            ctx.strokeStyle = penColor;
            ctx.lineWidth = 6;
            ctx.lineCap = "round";
            ctx.lineJoin = "miter";
            ctx.miterLimit = 10;

            ctx.beginPath();
            ctx.moveTo(lastMouseX,lastMouseY);
            ctx.lineTo(x, y);
            ctx.stroke();
        
            lastMouseX = x;
            lastMouseY = y;
        }
    }

    handlers.onMouseWheel = function (delta, x, y, el) {

    }

    handlers.onTouchStart = function (button, x, y, el) {
        y -= $("#drawAdventureContainer").offset().top - 20;;
        leftMouseDown = true;
        setCursor(mainCanvas, "hand");
        lastMouseX = x;
        lastMouseY = y;

        ctx.fillStyle = penColor;
        ctx.strokeStyle = penColor;
        ctx.moveTo(x,y);
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI*2, true);
        ctx.fill();
    }

    handlers.onTouchEnd = function (button, x, y, el) {
        leftMouseDown = false;
        setCursor(mainCanvas, null);
    }

    handlers.onTouchMove = function (x, y) {
        y -= $("#drawAdventureContainer").offset().top - 20;;
        if (leftMouseDown == true) {
            ctx.fillStyle = penColor;
            ctx.strokeStyle = penColor;
            ctx.lineWidth = 6;
            ctx.lineCap = "round";
            ctx.lineJoin = "miter";
            ctx.miterLimit = 10;

            ctx.beginPath();
            ctx.moveTo(lastMouseX,lastMouseY);
            ctx.lineTo(x, y);
            ctx.stroke();
        
            lastMouseX = x;
            lastMouseY = y;
        }
    }


    handlers.onGestureStart = function (button, x, y, el) {
        y -= $("#drawAdventureContainer").offset().top - 20;;
        setCursor(mainCanvas, "hand");
        lastMouseX = x;
        lastMouseY = y;
    }

    handlers.onGestureEnd = function (button, x, y, el) {
        setCursor(mainCanvas, null);

        if (mouseDelta < 4) {
        }
        mouseDelta = 0;
    }

    handlers.onGestureChange = function (delta, x, y, el) {

    }


    handlers.onKeyDown = function (keyCode) {
         switch (keyCode) {
            case 16: // shift
                shiftDown = true;
                return true;
            case 17: // ctrl
                ctrlDown = true;
                return true;
            case 32:
                return true;
        }
        return false;
    }

    handlers.onKeyUp = function (keyCode) {
        switch (keyCode) {
            case 16: // shift
               shiftDown = false;
               return true;
            case 17: // ctrl
                ctrlDown = false;
                return true;
            case 32: // space
                viewport.zoomToFit(3.0);
                return true;
        }
        return false;
    }

    setupInput(mainCanvas, handlers);
}