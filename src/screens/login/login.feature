Feature: Login Screen

  Scenario: See UI
    Given any
    When I am at 'Login' Screen
    Then I should see 'Google Login' Button

  Scenario: Login Successfully
    Given I am at 'Login' Screen
    And I press 'Google Login' Button
    Then I should be 'Logged In to Firebase'
