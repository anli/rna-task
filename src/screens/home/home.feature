Feature: Home Screen

  Scenario: See Home Screen
    Given I have a task 'Task A', date 'Sat, 10 Apr'
    And I have a task 'Task B'
    When I am at 'Home' Screen
    Then I should see 'All Tasks'
    And I should see 'Task A'
    And I should see 'Task B'

  Scenario: Update Task
    Given I have a task 'Task A'
    And I am at 'Home' Screen
    When I press 'Task A' Button
    Then I should see 'Task Update' Screen

  Scenario: Filter tasks by What I can do
    Given I am logged in
    When App load
    And I press 'Can do' Button
    Then I should see 'Can do' selected tab

  Scenario: Filter tasks by What I want to do Today
    Given I am logged in
    When App load
    And I press 'Today' Button
    Then I should see 'Today' selected tab

  Scenario: Filter tasks by What I did Previously
    Given I am logged in
    When App load
    And I press 'Previously' Button
    Then I should see 'Previously' selected tab

  Scenario: Mark task as completed
    Given I have 'Task A' not completed
    When App load
    And I press 'Task A' 'Mark as complete' Button
    Then I should see 'Task A' completed
    And I should see 'Succesful Toast'

  Scenario: See completed tasks
    Given I am at 'Home' Screen
    When I press 'Completed' button
    Then I should see 'Completed Tasks'

  Scenario: Mark task as not completed
    Given I have 'Completed Task' completed
    And I am at 'Home' Screen
    And I press 'Completed Task' 'Mark as not complete' Button
    Then I should see 'Completed Task' not completed
    And I should see 'Succesful Toast'

  Scenario: Mark task as done failed
    Given I have 'Task A' not completed
    And API to update task will fail
    And I am at 'Home' Screen
    When I press 'Task A' 'Mark as complete' Button
    Then I should see 'Error Toast'

  Scenario: See schedule tasks
    Given App load
    When I am at 'Home' Screen
    Then I should see 'Scheduled Task'

  Scenario: Mark task as done validation failed
    Given I have 'Task B' with no date
    And I am at 'Home' Screen
    When I press 'Task B' 'Mark not completed' Button
    Then I should see 'Error Toast' 'Please enter a date first.'

  Scenario: Delete obsolete tasks
    Given I have 'Obsolete task'
    And I am at 'Home' Screen
    When I press 'more' Icon Button
    And I press 'Delete completed tasks before previously' Button
    Then I should see 'Success Toast' 'Deleted obsolete tasks successfull'