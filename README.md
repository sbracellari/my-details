# Table of Contents

- [My Details Soffit](#my-details-soffit)
- [Location and Interaction](#location-and-interaction)
- [Build Processes](#build-processes)

## My Details Soffit

My Details is an application that allows the user to view their student data, i.e. their majors, minors, concentrations, academic adviser, and any other
relevant degree info, as well as their personal data, i.e. legal name, preferred first name, address, GID, email, etc. My Details also allows the student to change their preferred first name if they wish to do so.

## Location and Interaction

In uPortal, My Details lives under the `Welcome` and `Academics` tabs at the top of each, and its target audience is students and staff of Oakland University.

## Build Processes

To build this project with demo data, navigate to the `App.js` in `src/main/react/src` and call `get_details` with a parameter of `true`, and then navigate to `src/main/react/src/components/PersonalInfo.js` and call `update_pref_name` with parameters of `this.state.inputPrefName, true`. The default values of these parameters are `false` and `this.state.inputPrefName`, respectively. Once these values have been changed, you can run an `npm start` in `src/main/react` and interact with the frontend without running the backend.

If you want to run the frontend with actual data but still outside of uPortal, ensure that the parameters passed in `get_details` and `update_pref_name` are `false` and `this.state.inputPrefName`, respectively. Again, `get_details` can be found in `/src/main/react/src/App.js`, and `update_pref_name` can be found in `src/main/react/src/components/PersonalInfo.js` . Now, navigate to the `api.js` in `src/main/react/src/api` and remove the `/mydetails` from the front of both fetch request endpoints, and then run a `./gradlew clean bootRun` in the root of the project while simultaneously running an `npm start` in `src/main/react`. This will give you actual data without running the project inside of uPortal.

To build in preparation of deploying to uPortal, ensure that `/mydetails` exists at the beginning of the two fetch request endpoints in the `api.js`, and that `get_details` and `update_pref_name` are called with values of `false` and `this.state.inputPrefName`, and then run a `./gradlew clean build` in the root of the project. To deploy, follow [this](https://code.oakland.edu/ea-developers/training/blob/master/module06/README.md#deploying-a-soffit-to-uportal) guide.
> **Note:** You can also deploy the project to uPortal with demo data, if you wish to do so.
