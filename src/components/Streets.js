import firebase from "firebase/app";
import "firebase/firestore";

//components
import Street from "./Street";

const increment = firebase.firestore.FieldValue.increment(1);
const decrement = firebase.firestore.FieldValue.increment(-1);

const Streets = ({ db }) => {
  // Document reference
  const totalTotalRef = db.collection("counter").doc("total");
  const inTotalRef = db.collection("counter").doc("total");
  const outTotalRef = db.collection("counter").doc("total");

  const total18thRef = db.collection("counter").doc("18th");
  const in18thRef = db.collection("counter").doc("18th");
  const out18thRef = db.collection("counter").doc("18th");

  const totalMavenRef = db.collection("counter").doc("maven");
  const inMavenRef = db.collection("counter").doc("maven");
  const outMavenRef = db.collection("counter").doc("maven");

  const totalWazeeRef = db.collection("counter").doc("wazee");
  const inWazeeRef = db.collection("counter").doc("wazee");
  const outWazeeRef = db.collection("counter").doc("wazee");

  const totalAlleyRef = db.collection("counter").doc("alley");
  const inAlleyRef = db.collection("counter").doc("alley");
  const outAlleyRef = db.collection("counter").doc("alley");

  return (
    <>
      <Street
        street="18th"
        totalTotalRef={totalTotalRef}
        inTotalRef={inTotalRef}
        outTotalRef={outTotalRef}
        totalStreetRef={total18thRef}
        inStreetRef={in18thRef}
        outStreetRef={out18thRef}
        increment={increment}
        decrement={decrement}
      />
      <Street
        street="maven"
        totalTotalRef={totalTotalRef}
        inTotalRef={inTotalRef}
        outTotalRef={outTotalRef}
        totalStreetRef={totalMavenRef}
        inStreetRef={inMavenRef}
        outStreetRef={outMavenRef}
        increment={increment}
        decrement={decrement}
      />
      <Street
        street="wazee"
        totalTotalRef={totalTotalRef}
        inTotalRef={inTotalRef}
        outTotalRef={outTotalRef}
        totalStreetRef={totalWazeeRef}
        inStreetRef={inWazeeRef}
        outStreetRef={outWazeeRef}
        increment={increment}
        decrement={decrement}
      />
      <Street
        street="alley"
        totalTotalRef={totalTotalRef}
        inTotalRef={inTotalRef}
        outTotalRef={outTotalRef}
        totalStreetRef={totalAlleyRef}
        inStreetRef={inAlleyRef}
        outStreetRef={outAlleyRef}
        increment={increment}
        decrement={decrement}
      />
    </>
  );
};

export default Streets;
