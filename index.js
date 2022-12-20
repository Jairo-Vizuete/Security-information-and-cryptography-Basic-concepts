const selectElement = document.querySelector("#crypto");
const selectKey = document.querySelector("#select");

selectElement.addEventListener("keydown", () => {
  btn.disabled = false;
});
selectElement.addEventListener("change", () => {
  content.innerHTML = "";
});

function submit() {
  console.log(selectKey.value);
  btn.disabled = true;
  const charCodeArr = [];
  let crypto = document.getElementById("crypto").value;

  if (crypto == "") return alert("The input is empty");

  for (const e of crypto) {
    if (/^\s+$/.test(e)) {
      return alert("There are empty spaces");
    }
  }

  var codeAux = [];
  crypto.split("").forEach((e) => {
    const eAux = e.charCodeAt(0).toString(2);
    charCodeArr.push(e.charCodeAt(0).toString(2));
    if (eAux.length === 6) {
      codeAux.push("0".concat(eAux));
    } else {
      codeAux.push(e.charCodeAt(0).toString(2));
    }
    const newElementDiv = document.createElement("p");
    newElementDiv.textContent = e + " = " + e.charCodeAt(0).toString(2);
    document.querySelector("#content").appendChild(newElementDiv);
  });

  //const title = document.createElement("h2");
  //title.textContent = "The code is:";
  //document.querySelector("#content").appendChild(title);

  //const body = document.createElement("h3");
  //body.textContent = charCodeArr.join("");
  //document.querySelector("#content").appendChild(body);

  let initialCode = codeAux.join("");
  for (let i = 0; i < selectKey.value; i++) {
    const firstMiddleCode = initialCode.substring(0, initialCode.length / 2);
    const secondMiddleCode = initialCode.substring(initialCode.length / 2);
    const aux = handleChange(secondMiddleCode);
    initialCode = secondMiddleCode.concat(handleXor(firstMiddleCode, aux));

    console.log(i + 1);
    console.log("key:");
    console.log("Bloque A:");
    console.log(firstMiddleCode);
    console.log("Bloque B:");
    console.log(secondMiddleCode);
    console.log("Function in B:");
    console.log(aux);
    console.log("XOR:");
    console.log(handleXor(firstMiddleCode, aux));
    console.log("Concat:");
    console.log(initialCode);

    const newElementDiv = document.createElement("h3");
    newElementDiv.textContent = `Key: ${i + 1}`;
    const newElementFM = document.createElement("p");
    newElementFM.textContent = `Block A: ${firstMiddleCode}`;
    const newElementSM = document.createElement("p");
    newElementSM.textContent = `Block B: ${secondMiddleCode}`;
    const newElementSMT = document.createElement("p");
    newElementSMT.textContent = `Transformed Block B: ${aux}`;
    const newElementXor = document.createElement("p");
    newElementXor.textContent = `Process xor between A & B(transformed): ${aux}`;
    const newElementFinalKey = document.createElement("p");
    newElementFinalKey.textContent = `Final key: ${initialCode}`;

    document.querySelector("#content").appendChild(newElementDiv);
    document.querySelector("#content").appendChild(newElementFM);
    document.querySelector("#content").appendChild(newElementSM);
    document.querySelector("#content").appendChild(newElementSMT);
    document.querySelector("#content").appendChild(newElementXor);
    document.querySelector("#content").appendChild(newElementFinalKey);
  }
}

const handleXor = (first, second) => {
  const respone = [];
  for (let i = 0; i < first.length; i++) {
    if (first[i] == second[i]) {
      respone.push("0");
    } else {
      respone.push("1");
    }
  }
  return respone.join("");
};

const handleChange = (secondMiddle) => {
  const a = secondMiddle.split("");
  const b = secondMiddle.split("").pop();
  a.pop();
  a.unshift(b);
  return a.join("");
};
