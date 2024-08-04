import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UpdateProfile from "./UpdateProfile";

const queryClient = new QueryClient();

describe("UpdateProfile", () => {
  test("renders edit profile form", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/profile/1"]}>
          <Route path="/profile/:id">
            <UpdateProfile />
          </Route>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Bio")).toBeInTheDocument();
  });

  test("submits form with valid data", async () => {
    const mockUpdateUser = jest.fn();
    const mockNavigate = jest.fn();

    const { result } = renderHook(() =>
      useForm<z.infer<typeof ProfileValidation>>({
        resolver: zodResolver(ProfileValidation),
        defaultValues: {
          file: [],
          name: "John Doe",
          username: "johndoe",
          email: "john@example.com",
          bio: "Lorem ipsum",
        },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/profile/1"]}>
          <Route path="/profile/:id">
            <UpdateProfile
              updateUser={mockUpdateUser}
              navigate={mockNavigate}
              form={result.current}
            />
          </Route>
        </MemoryRouter>
      </QueryClientProvider>
    );

    fireEvent.submit(screen.getByRole("button", { name: "Update Profile" }));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({
        userId: "1",
        name: "John Doe",
        bio: "Lorem ipsum",
        file: [],
        imageUrl: "",
        imageId: "",
      });
      expect(mockNavigate).toHaveBeenCalledWith("/profile/1");
    });
  });

  // Add more tests for different scenarios and edge cases
});