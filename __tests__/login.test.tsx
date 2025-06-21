import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "src/app/login/page";

describe("Login Page", () => {
  it("renders login form", () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("shows validation errors", async () => {
    render(<LoginPage />);
    fireEvent.click(screen.getByText("Login"));
    expect(await screen.findByText("Invalid email address")).toBeInTheDocument();
    expect(await screen.findByText("Password must be at least 6 characters")).toBeInTheDocument();
  });
});