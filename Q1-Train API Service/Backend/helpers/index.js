async function getauthToken() {
  const authData = await fetch("http://20.244.56.144/train/auth", {
    method: "POST",
    body: JSON.stringify({
      companyName: "Train Central",
      clientID: "9b6e86e0-aff4-4043-a2bd-f7aa4a57287d",
      clientSecret: "hPnxeSCjulnkeSRv",
      ownerName: "Swayam Soni",
      ownerEmail: "SwayamSoni.1905@gmai.com",
      rollNo: "20131010865",
    }),
  });
  const thisData = await authData.json();
  return thisData;
}

module.exports = { getauthToken };
