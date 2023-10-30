Feature: Login

  Scenario: Logging in with valid credentials
     Given I am on the login page
     When I enter valid credentials
     Then I should be taken to the dashboard
