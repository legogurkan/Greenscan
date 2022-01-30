/* Todo
	Maybe
		Something after entering search query.
		Changing BorderTop(Left/Right)Radius = 0 when navbar is sticked e.g. after ~60px scroll.
		Filtering recipes.
*/

/*===== Adding submit event listener to nav-form =====*/
document.getElementById("navForm").addEventListener("submit", function(event) {
	event.preventDefault(); // Prevents website to reload on submit
	query = document.getElementById("search").value.trim(); // Fetch search query
	if (query !== "") { // If query isn't only whitespace
		alert(`Du har sökt efter: ${document.getElementById("search").value}`); // Prompting the search query
	}
})

/*===== To Top Arrow =====*/
toTopArrow = document.getElementById("to-top-arrow"); // Fetch "button"
window.onscroll = function() { scrollFunction() }; // Call scrollFunction on scroll event

function scrollFunction() {
	if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) { // If user has scrolled past 30px
		toTopArrow.style.visibility = "visible"; // Make button visible
		toTopArrow.style.opacity = 1; // Visible transition
		toTopArrow.style.transition = "visibility 0s, opacity 0.5s ease-in-out"; // Actual transition
	} else {
		toTopArrow.style.visibility = "hidden"; // Make button hidden
		toTopArrow.style.opacity = 0; // Hidden transition
		toTopArrow.style.transition = "visibility 0.5s, opacity 0.5s ease-in-out"; // Actual transition
	}
}

/*===== Log in system =====*/
function showError(e) {
	console.error(e);
	alert(e);
	document.getElementById('searchbar-login-button').classList.remove("hidden");
}

function success(decodeIDToken) {
	document.getElementById('Name').textContent = 'Hej, ' + decodeIDToken.name;
	var node = document.getElementById('afterLogin');
	node.textContent ='Dina mål denna månad är: 0 kg CO';
	var x = document.createElement("SUB");
  	var t = document.createTextNode("2");
	var utslapp = document.createTextNode(" utsläpp");
  	x.appendChild(t);
  	node.appendChild(x);
	node.appendChild(utslapp);

}
(async function(){
	const appID = new AppID();
	await appID.init({
		clientId: 'd646f530-1146-48ec-950b-d2498bc93842',
		discoveryEndpoint: 'https://eu-de.appid.cloud.ibm.com/oauth/v4/fe3425ce-fa7a-40df-857d-d8f5acc06348/.well-known/openid-configuration'
	});
	document.getElementById('searchbar-login-button').addEventListener('click', async () => {
		document.getElementById('searchbar-login-button').setAttribute('class', 'hidden');

		try {
			tokens = await appID.signin();
			let userInfo = await appID.getUserInfo(tokens.accessToken);
			success(tokens.idTokenPayload);
		} catch (e) {
			showError(e);
		}
	});
})()
