
Feature: Setting Screen

  Scenario: See UI
    Given App version is '1.0.0'
    And my email is 'user@email.com'
    When I am at 'Setting' Screen
    Then I should see 'Version 1.0.0' text
    And I should see 'You are on the latest version' text
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

  Scenario: Switch account successfully
    Given I am at 'Setting' screen
    When I press 'Switch Account' button
    Then I should be 'logged in'

  Scenario: See UI when new version is available
    Given App version is '1.0.0'
    And App Store Version is '2.0.0'
    When I am at 'Setting' Screen
    Then I should see 'Version 1.0.0' text
    And I should see 'New version 2.0.0 is available' text

  Scenario: Press version to go to store URL
    Given App version is '1.0.0'
    And App Store Version is '2.0.0'
    Given I am at 'Setting' Screen
    When I press 'Version 1.0.0' button
    Then I should go to 'Store URL'

  Scenario: See enabled notification setting UI
    Given I enabled notification
    When I am at 'Setting' Screen
    Then I should see 'Daily notification is enabled' text
    And I should see 'Every morning at 9AM' text

  Scenario: See disabled notification setting UI
    Given I disabled notification
    When I am at 'Setting' Screen
    Then I should see 'Daily notification is disabled' text
    And I should see 'Every morning at 9AM' text

  Scenario: Disable notification setting
    Given I enabled notification
    And I am at 'Setting' Screen
    When I press 'Daily notification is enabled' text button
    Then I should see 'Daily notification is disabled' text
