describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should login", () => {
    cy.findByLabelText(/username/i).type("some@some.com");
    cy.findByLabelText(/password/i).type("password");

    cy.findByRole("button").click();

    cy.findByTestId("login-success").should("exist");
  });

  it("should fail to login", () => {
    cy.findByLabelText(/username/i).type("some");
    cy.findByLabelText(/password/i).type("password");

    cy.findByRole("button").click();

    cy.findByTestId("login-error").should("exist");
  });
});
