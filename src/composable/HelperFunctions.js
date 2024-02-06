import axios from "axios";
// import { AUTH_CONTEXT } from "@/api/api";
import { useToast } from "vue-toastification";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

const toast = useToast();

export const helperFunctions = {
  truncateAmount(amount) {
    try {
      // Truncate finalAmount to 2 decimal places without rounding up
      if (amount === undefined || amount === null) {
        return 0;
      }
      const truncatedAmount = Math.trunc(amount * 100) / 100;
      return truncatedAmount;
    } catch (error) {
      console.error("error:", error);
      return 0;
    }
  },
  formatAmount(amount) {
    try {
      if (
        amount === undefined ||
        amount === null ||
        amount === 0 ||
        typeof amount !== "number" ||
        isNaN(amount)
      ) {
        return "₦0.00";
      }
      let formatedAmount = parseInt(amount);
      formatedAmount = amount.toLocaleString("en-NG", {
        style: "currency",
        code: "NG",
        currency: "NGN",
      });

      return formatedAmount;
    } catch (error) {
      console.error("error:", error);
      return 0;
    }
  },
  processNumber(phoneNumber) {
    let formatted = "";
    if (phoneNumber) {
      let phone = phoneNumber;
      let firstDigit = phone.charAt(0);
      if (firstDigit == "0") {
        formatted = phone.replace("0", "234").replace(/\s+/g, "");
      } else if (firstDigit == 2) {
        formatted = phone.replace(/\s+/g, "");
      } else if (firstDigit == "+") {
        formatted = phone.substring(1).replace(/\s+/g, "");
      }
    }
    return String(formatted);
  },
  truncateObj(obj) {
    if (obj === undefined || obj === null) {
      return obj;
    }

    let keysArr = [];

    keysArr = Object.keys(obj);

    keysArr.map((b) => {
      //loop through the keys contained in the object
      if (typeof obj[b] === "number") {
        //if its value is a number, truncuate it to 2 decimal places
        obj[b] = this.truncateAmount(obj[b]).toLocaleString();
      }
    });
    return obj;
  },
  resetObj(obj) {
    obj = Object.keys(obj).reduce((acc, curr) => {
      if (obj[curr] === null) return { ...acc, [curr]: null };
      if (typeof obj[curr] === "undefined")
        return { ...acc, [curr]: undefined };
      // if (typeof obj[curr] === "boolean") return { ...acc, [curr]: false }; //Handle Booleans separately
      if (typeof obj[curr] === "string") return { ...acc, [curr]: "" };
      if (typeof obj[curr] === "number") return { ...acc, [curr]: 0 };
      if (obj[curr] instanceof Array) return { ...acc, [curr]: [] };
      if (typeof obj[curr] === "object") return { ...acc, [curr]: {} };
    }, {});
    return obj;
  },
  processDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    return today;
  },

  //   validateEmail(strn) {
  //     if (strn) {
  //       let bool;
  //       function containsSpecialChars(strn) {
  //         const specialChars = /[ `!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
  //         // const num = strn.replace(/[^.]/g, "").length;
  //         // const num1 = strn.replace(/[^@]/g, "").length;
  //         bool = specialChars.test(strn);
  //       }
  //       let validRegex =
  //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //       containsSpecialChars(strn);
  //       if (strn) {
  //         if (strn.match(validRegex) && !bool) {
  //           return true;
  //         } else {
  //           return false;
  //         }
  //       }
  //     }
  //   },
  validatePhone(phone) {
    // if (phone.trim() == "") {
    //   return false;
    // }
    if (phone.length) {
      if (phone.charAt(0) == 0 && phone.length !== 11) {
        return false;
      } else if (phone.charAt(0) == 2 && phone.length !== 13) {
        return false;
      } else {
        // errorRules.email = false;
        // errorRules.pin = false;

        return true;
      }
    }
  },
  calculatePercentage(num, per) {
    const result = (Number(num) / 100) * Number(per);
    return result;
  },

  formatDateString(date, arg) {
    let formattedDate;
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (date && date.length > 0 && date !== "N/A") {
      let dd = date.slice(8, 10);
      let mm = date.slice(5, 7);

      let yyyy = date.slice(0, 4);
      // if (dd < 10) {
      //   dd = "0" + dd;
      // }
      // if (mm < 10) {
      //   mm = "0" + mm;
      // }
      formattedDate =
        arg === "name"
          ? months[parseInt(mm.toString())] + " " + dd + ", " + yyyy
          : dd + "/" + mm + "/" + yyyy;
    } else {
      formattedDate = "N/A";
    }

    return formattedDate;
  },

  //   async uploadFileToServer(fil) {
  //     // Replace 'https://example.com/graphql' with the actual GraphQL endpoint URL
  //     const graphqlEndpoint = "http://localhost:4000/graphql";

  //     // Your input data for the mutation
  //     const inputData = {
  //       // Assuming you have a file object to upload named 'imageFile'
  //       input: {
  //         imageDataArray: [fil], // Replace 'imageFile' with your actual file object
  //       },
  //     };

  //     // Set the appropriate headers for the GraphQL request
  //     const headers = {
  //       "Content-Type": "application/json",
  //       // You might need to add other headers like authentication if required by the API
  //     };

  //     // Make the GraphQL mutation request using Axios
  //     axios
  //       .post(
  //         graphqlEndpoint,
  //         {
  //           query: `mutation UploadImage($input: ImageUploadInput!) {
  //     uploadImage(input: $input) {
  //       imageUrls
  //     }
  //   }`,
  //           variables: inputData,
  //         },
  //         {
  //           headers: headers,
  //         }
  //       )
  //       .then((response) => {
  //         console.log(response.data);
  //         // Handle the response data here
  //       })
  //       .catch((error) => {
  //         toast.error(error.message);
  //         console.error("Error:", error);
  //         // Handle errors here
  //       });
  //   },
  convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result.split(",")[1]); // Extract the base64 string from the Data URL
      };

      reader.onerror = () => {
        reject(new Error("Failed to read the file."));
      };

      reader.readAsDataURL(file);
    });
  },
  // async uploadFileToServer(fileToUpload) {
  //   if (fileToUpload) {
  //     const formData = new FormData();
  //     const operation = "uploadImage";
  //     formData.append(
  //       "operations",
  //       `{
  //             "query": "mutation ${operation}($files: [Upload!]!) { ${operation}(files: $files){imageUrls} }"
  //           }`
  //     );

  //     for (let i = 0; i < fileToUpload.length; i++) {
  //       formData.append(`map`, `{"${i}": ["variables.files.${i}"]}`);
  //       formData.append(`${i}`, fileToUpload[i]);
  //     }
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:4000/graphql",
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //             //   authorization: AUTH_CONTEXT(),
  //           },
  //         }
  //       );
  //       console.log(response.data.data.uploadImage.imageUrls, "FILEURL");
  //       if (response) {
  //         return response.data.data.uploadImage.imageUrls;
  //       } else {
  //         throw new Error(response.data.errors[0].message);
  //       }
  //     } catch (err) {
  //       toast.error(err.message);
  //       console.log(err.message);
  //       return null;
  //     }
  //   }
  //   return "";
  // },

  //   flattenObj(ob) {
  //     // The object which contains the
  //     // final result
  //     let result = {};

  //     // loop through the object "ob"
  //     for (const i in ob) {
  //       // We check the type of the i using
  //       // typeof() function and recursively
  //       // call the function again
  //       if (typeof ob[i] === "object" && !Array.isArray(ob[i])) {
  //         const temp = flattenObj(ob[i]);
  //         for (const j in temp) {
  //           // Store temp in result
  //           result[i + "." + j] = temp[j];
  //         }
  //       }

  //       // Else store ob[i] in result directly
  //       else {
  //         result[i] = ob[i];
  //       }
  //     }
  //     return result;
  //   },
  async uploadFileToServer(base64Strings) {
    if (base64Strings && base64Strings.length > 0) {
      const operation = "uploadImages";
      const query = `mutation ${operation}($files: [String!]!) {
        ${operation}(files: $files) 
      }`;

      const variables = {
        files: base64Strings,
      };

      try {
        const response = await axios.post(
          // "http://localhost:4000/graphql",
          "https://torfserver.onrender.com/graphql",
          {
            query,
            variables,
          },
          {
            headers: {
              "Content-Type": "application/json",
              //   authorization: AUTH_CONTEXT(),
            },
          }
        );

        console.log(response.data.data.uploadImages, "FILEURL");
        if (response && response.data.data.uploadImages) {
          return response.data.data.uploadImages;
        } else if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
        } else {
          throw new Error("Failed to upload files.");
        }
      } catch (err) {
        toast.error(err.message);
        console.log(err.message);
        return null;
      }
    }
    return "";
  },

  async fetchDocs(token) {
    try {
      const response = await axios.get(
        // "http://localhost:4000/graphql",
        "https://www.googleapis.com/drive/v3/files",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response, "FILEURL");
      // if (response && response.data.data.uploadImages) {
      //   return response.data.data.uploadImages;
      // } else if (response.data.errors) {
      //   throw new Error(response.data.errors[0].message);
      // } else {
      //   throw new Error("Failed to upload files.");
      // }
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
      return null;
    }
  },

  getAvatar(employee) {
    function getColor(index) {
      let n = (index * 0xfffff * 1000000).toString(16);
      return "#" + n.slice(0, 6);
    }

    let name = "",
      color;

    if (employee) {
      console.log(employee);
      let letters = "abcdefghijklmnopqrstuvwxyz";
      const alphabet = letters.split("");
      //   const empId = employee.job && employee.job.userName;
      //   const thenum = empId ? Number(empId.replace(/\D/g, "")) : 1;
      const initialOne = String(
        employee &&
          employee.profile &&
          employee.profile.firstName &&
          employee.profile.firstName.charAt(0)
      );
      const initialTwo = String(
        employee &&
          employee.profile &&
          employee.profile.lastName &&
          employee.profile.lastName.charAt(0)
      );
      const num =
        Number(alphabet.indexOf(initialOne.toLowerCase())) +
        Number(alphabet.indexOf(initialTwo.toLowerCase()));
      color = getColor(num);
      // Get color

      employee
        ? (name = `${
            employee && employee.profile && employee.profile.firstName
              ? employee.profile.firstName.charAt(0)
              : ""
          }${
            employee && employee.profile && employee.profile.lastName
              ? employee.profile.lastName.charAt(0)
              : ""
          }`)
        : "N/A";
    }

    return {
      color,
      name,
    };
  },

  // Get rid of the proxy when console.log
  log(arg) {
    console.log(JSON.parse(JSON.stringify(arg)));
  },

  lastDateOfMonth(month, year) {
    console.log(month, year);
    if (year && month) {
      const date = new Date(year, month + 1, 0); // Set the date to the first day of the next month
      date.setDate(-1); // Decrement the date by one day
      return date.getDate();
    }
  },

  downloadBase64(base64String, fileName) {
    const link = document.createElement("a");
    link.href = `data:application/pdf;base64,${base64String}`;
    link.download = fileName;
    link.click();
  },

  viewPDF(base64String) {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    const pdfUrl = URL.createObjectURL(blob);
    window.open(pdfUrl, "_blank");
  },

  printPDF(base64Pdf) {
    // Create a Blob from the base64 PDF string
    const pdfData = atob(base64Pdf);
    const arrayBuffer = new ArrayBuffer(pdfData.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < pdfData.length; i++) {
      uint8Array[i] = pdfData.charCodeAt(i);
    }
    const pdfBlob = new Blob([arrayBuffer], { type: "application/pdf" });

    // Generate a URL for the Blob
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Open the PDF in a new browser tab
    const newTab = window.open(pdfUrl, "_blank");

    // Trigger print dialog when new tab is loaded
    newTab.onload = function () {
      newTab.print();
    };
  },

  relativeTime(date) {
    const timeAgo = new TimeAgo("en-US");
    return timeAgo.format(new Date(date));
  },
};
