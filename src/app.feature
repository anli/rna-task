Feature: App

  Scenario: I am logged in
    Given I am logged in
    When App load
    Then I should see 'All Tasks'

  Scenario: I am logged out
    Given I am logged out
    When App load
    Then I should see 'Google Login' Button