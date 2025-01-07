import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Store from "./store";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  http.get("http://localhost:3001/api/products", () => {
    return HttpResponse.json([
      { id: "1", name: "Product 1", inventory_count: 10 },
      { id: "2", name: "Product 2", inventory_count: 5 },
    ]);
  }),
  http.post("http://localhost:3001/api/products/:id", () => {
    return HttpResponse.json({ message: "Purchase successful" });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders store page and fetches products", async () => {
  render(<Store />);

  expect(screen.getByText(/store/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/product 2/i)).toBeInTheDocument();
  });
});

test("selects a product and updates quantity", async () => {
  render(<Store />);

  await waitFor(() => {
    expect(screen.getByText(/product 1/i)).toBeInTheDocument();
  });

  const selectButton = screen.getAllByText(/select/i)[0];
  fireEvent.click(selectButton);

  expect(screen.getByText(/selected product/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue("1")).toBeInTheDocument();

  fireEvent.change(screen.getByDisplayValue("1"), { target: { value: "2" } });

  expect(screen.getByDisplayValue("2")).toBeInTheDocument();
});

test("handles purchase", async () => {
  render(<Store />);

  await waitFor(() => {
    expect(screen.getByText(/product 1/i)).toBeInTheDocument();
  });

  const selectButton = screen.getAllByText(/select/i)[0];
  fireEvent.click(selectButton);
  fireEvent.change(screen.getByDisplayValue("1"), { target: { value: "2" } });
  fireEvent.click(screen.getByText(/buy/i));

  await waitFor(() => {
    expect(screen.getByText(/purchase successful/i)).toBeInTheDocument();
  });
});
