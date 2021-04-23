/* global token */

export const get_details = async is_demo => {
  if (is_demo) {
    return {
      student: {
        curriculums: [
          {
            degreeStatus: null,
            standing: "Master's",
            college: "School of Egr. and Comp. Sci.",
            degree: "Masters of Science",
            level: "Graduate",
            majors: [
              "Computer Science"
            ],
            minors: [
              "Philosophy",
              "Psychology",
            ],
            concentrations: [
              "Sys. Admin.",
            ]
          },
          {
            degreeStatus: "Applied to Graduate",
            standing: "Senior",
            college: "School of Business Admin.",
            degree: "Bachelor of Arts",
            level: "Undergraduate",
            majors: [
              "Information Technology Mgmt"
            ],
            minors: [
              "Japanese"
            ],
            concentrations: []
          },
          {
            degreeStatus: "Graduated",
            standing: null,
            college: "College of Arts and Sciences",
            degree: "Bachelors of Arts",
            level: "Undergraduate",
            majors: [
              "Mathematics",
              "Phyics"
            ],
            minors: [],
            concentrations: [
              "Music",
            ]
          },
        ],
        adviser: {
          name: "Kurtis Kirkpatrick",
          email: "kirkpatrick@oakland.edu"
        }
      },
      person: {
        legalName: "Grace J. Comber",
        prefName: "Gracie",
        gid: "G00285303",
        email: "gjcomber@college.edu",
        address: "2886 Mitchell Circle Chicago IL",
        phone: "(313) 5432956"
      },
    }
  }

  try {
    const response = await fetch(
      // remove '/mydetails' if running outside of uPortal
      '/mydetails/v1/details', {
        credentials: 'include',
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token 
        }
      }
    )

    const data = await response.json()
    return data
  } catch (err) {
    return err
  }
}

export const update_pref_name = async (inputPrefName, demo) => {
  if(demo) {
    return {
      response: false,
      person: {
        prefName: inputPrefName,
      }
    }
  } 

  try {
    const response = await fetch(
      // remove '/mydetails' if running outside of uPortal
      '/mydetails/v1/preferred-name/' + inputPrefName,
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token
        },
        body: inputPrefName
      }
    )

    const data = response.ok
    console.log(data)
    return data
  } catch (err) {
    return err
  }
}
