
Feature: Setting Screen

  Scenario: See UI
    Given App version is '1.0.0'
    And my email is 'user@email.com'
    When I am at 'Setting' Screen
    Then I should see '1.0.0' text
    And I should see 'user@email.com' text

  Scenario: Logout Successfully
    Given I am logged in
    When App load
    And I press 'Logout' Button
    Then I should be 'Logout'

  Scenario: Logout Failed
    Given I am logged in
    And Logout API will always return error
    When App load
    And I press 'Logout' Button
    Then I should see 'Error Message'