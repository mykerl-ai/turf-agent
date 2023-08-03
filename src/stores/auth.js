//store can be defined similar to the composition API setup, but it doesn't work as expected.
import { defineStore } from "pinia";
import { MUTATE } from "../api/index.js";

export const useAuthStore = defineStore("auth", {

  actions: {
    loginUser: (state = {}, loginPayload) =>
    MUTATE("EmployeeLogin", loginPayload, "AUTH"),
  registerCompany: (state = {}, registerPayload) =>
    MUTATE("RegisterCompany", registerPayload, "AUTH"),
  forgotPassword: (state = {}, forgotPasswordPayload) =>
    MUTATE("RequestPasswordReset", forgotPasswordPayload, "AUTH"),
  changePassword: (state = {}, resetPasswordPayload) =>
    MUTATE("ResetPassword", resetPasswordPayload, "AUTH"),
  },
});
