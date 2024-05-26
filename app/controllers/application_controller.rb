# frozen_string_literal: true

class ApplicationController < ActionController::Base
  def role_replaced_attributes(role)
    role_attr = role&.attributes
    department = role&.department
    role_attr['department'] = department&.attributes unless role_attr.nil?
    role_attr&.delete('department_id')

    role_attr
  end

  def user_replaced_attributes(user)
    user_attr = user.attributes

    employment_type = user.employment_type
    user_attr['employment_type'] = employment_type&.attributes
    user_attr.delete('employment_type_id')

    role = user.role
    user_attr['role'] = role_replaced_attributes(role)
    user_attr.delete('role_id')

    user_attr
  end

  def event_replaced_attributes(event)
    event_attrs = event.attributes
    organizer = User.find_by(id: event_attrs['organizer_id'])
    organizer_attr = user_replaced_attributes(organizer) unless organizer.nil?
    event_attrs.delete('organizer_id')
    event_attrs['organizer'] = organizer_attr

    users = event.users
    users_attr_array = []
    users.each do |user|
      users_attr_array << user_replaced_attributes(user)
    end
    event_attrs['users'] = users_attr_array

    roles = event.roles
    roles_attr_array = []
    roles.each do |role|
      roles_attr_array << role_replaced_attributes(role)
    end
    event_attrs['roles'] = roles_attr_array

    employment_types = event.employment_types
    employment_types_attr_array = employment_types.map(&:attributes)
    event_attrs['employment_types'] = employment_types_attr_array

    event_attrs
  end
end
