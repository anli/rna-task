Feature: Login Screen

  Scenario: See UI
    Given any
    When I am at 'Login' Screen
    Then I should see 'Google Login' Button

  Scenario: Login Successfully
    Given I am at 'Login' Screen
    When I press 'Google Login' Button
    Then I should be 'Logged In to Firebase'

  Scenario: Login Failure
    Given I am at 'Login' Screen
    And login will always fail
    When I press 'Google Login' Button
    Then I should see Error Message
