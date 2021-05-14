Feature: App

  Scenario: I am logged in
    Given I am logged in
    When App load
    Then I should see 'Can do'
    And I should see 'Today'
    And I should see 'Previously'
    And I should see 'All'

  Scenario: I am logged out
    Given I am logged out
    When App load
    Then I should see 'Google Login' Button

  Scenario: Press Add Task Bottom Tab Button
    Given I am logged in
    When App load
    And I press 'Add Task' Button
    Then I should see 'Add Task' Screen

  Scenario: See badge in Setting Tab Button
    Given I am logged in
    And there is App Update avaliable
    When App load
    Then I should see badge in Setting Tab Button