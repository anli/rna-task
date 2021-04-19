
Feature: Setting Screen

  Scenario: See UI
    Given App version is '1.0.0'
    When I am at 'Setting' Screen
    Then I should see 'Version' text
    And I should see '1.0.0' text

