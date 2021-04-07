import firebase from "firebase/app";
import "firebase/firestore";

//components
import Street from "./Street";

const increment = firebase.firestore.FieldValue.increment(1);
const decrement = firebase.firestore.FieldValue.increment(-1);

const Streets = (props) => {
  return (
    <>
      <Street
        street="18th"
        totalTotalRef={props.totalTotalRef}
        inTotalRef={props.inTotalRef}
        outTotalRef={props.outTotalRef}
        totalStreetRef={props.total18thRef}
        inStreetRef={props.in18thRef}
        outStreetRef={props.out18thRef}
        increment={increment}
        decrement={decrement}
      />
      <Street
        street="maven"
        totalTotalRef={props.totalTotalRef}
        inTotalRef={props.inTotalRef}
        outTotalRef={props.outTotalRef}
        totalStreetRef={props.totalMavenRef}
        inStreetRef={props.inMavenRef}
        outStreetRef={props.outMavenRef}
        increment={increment}
        decrement={decrement}
      />
      <Street
        street="wazee"
        totalTotalRef={props.totalTotalRef}
        inTotalRef={props.inTotalRef}
        outTotalRef={props.outTotalRef}
        totalStreetRef={props.totalWazeeRef}
        inStreetRef={props.inWazeeRef}
        outStreetRef={props.outWazeeRef}
        increment={increment}
        decrement={decrement}
      />
      <Street
        street="alley"
        totalTotalRef={props.totalTotalRef}
        inTotalRef={props.inTotalRef}
        outTotalRef={props.outTotalRef}
        totalStreetRef={props.totalAlleyRef}
        inStreetRef={props.inAlleyRef}
        outStreetRef={props.outAlleyRef}
        increment={increment}
        decrement={decrement}
      />
    </>
  );
};

export default Streets;
