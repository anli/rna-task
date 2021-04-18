Feature: Home Screen

  Scenario: See Home Screen
    Given I have a task 'Task A', date 'Sat, 10 Apr'
    And I have a task 'Task B'
    When I am at 'Home' Screen
    Then I should see 'All Tasks'
    And I should see 'Task A'
    And I should see 'Task B'

  Scenario: Add Task Button
    Given I am at 'Home' Screen
    When I press 'Add Task' Button
    Then I should see 'Task Add' Screen

  Scenario: Update Task
    Given I have a task 'Task A'
    And I am at 'Home' Screen
    When I press 'Task A' Button
    Then I should see 'Task Update' Screen

  Scenario: Filter tasks by What I can do
    Given I am logged in
    When App load
    And I press 'Filter' Button
    And I press 'What I can do'
    Then I should see 'What I can do'

  Scenario: Filter tasks by What I want to do Today
    Given I am logged in
    When App load
    And I press 'Filter' Button
    And I press 'What I want to do Today'
    Then I should see 'What I want to do Today'

  Scenario: Filter tasks by What I did Yesterday
    Given I am logged in
    When App load
    And I press 'Filter' Button
    And I press 'What I did Yesterday'
    Then I should see 'What I did Yesterday'

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