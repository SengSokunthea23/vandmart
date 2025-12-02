"use server";

import { auth } from "../auth";

export const login = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: { email, password },
      asResponse: true,
    });
    return {
      success: true,
      message: "Login successful!",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message ?? "Login failed!",
    };
  }
};

export const signUp = async (email: string, password: string, name: string) => {
  try {
    await auth.api.signUpEmail({
      body: { email, password, name },
    });
    return { success: true, message: "Signup successful" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "Signup failed" };
  }
};
