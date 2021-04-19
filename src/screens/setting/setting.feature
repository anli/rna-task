
Feature: Setting Screen

  Scenario: See UI
    Given App version is '1.0.0'
    And my email is 'user@email.com'
    When I am at 'Setting' Screen
    Then I should see '1.0.0' text
    And I should see 'user@email.com' text

