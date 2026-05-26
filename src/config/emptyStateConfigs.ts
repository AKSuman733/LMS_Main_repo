import { NavigateFunction } from 'react-router'

export const emptyStates = {
  courses: {
    icon: '📚',
    title: 'No Courses Yet',
    message: 'Ready to create your first course? Get started and build your learning library.',
    actionLabel: '+ Create Course',
    actionRoute: '/admin/courses/new',
  },
  users: {
    icon: '👥',
    title: 'No Users Found',
    message: 'No users match your current filters. Try adjusting your search or filters.',
    actionLabel: 'Clear Filters',
    secondaryLabel: 'Invite User',
  },
  enrollments: {
    icon: '📋',
    title: 'No Enrollments Yet',
    message: "Students haven't enrolled in any courses yet. Share course links to get started.",
    actionLabel: 'View Courses',
    actionRoute: '/admin/courses',
  },
  searchResults: {
    icon: '🔍',
    title: 'No Results Found',
    message: 'We couldn\'t find anything matching your search. Try different keywords.',
    actionLabel: 'Clear Search',
  },
  analytics: {
    icon: '📈',
    title: 'No Data Available',
    message: 'Analytics data will appear once users start enrolling in courses.',
    actionLabel: 'View Courses',
  },
  approvals: {
    icon: '✅',
    title: 'All Caught Up!',
    message: 'No pending approvals. Everything is up to date.',
    actionLabel: 'View All Courses',
  },
  reports: {
    icon: '📄',
    title: 'No Reports Generated',
    message: 'Generate your first report to see platform insights.',
    actionLabel: 'Generate Report',
  },
  notifications: {
    icon: '🔔',
    title: 'No Notifications',
    message: "You're all caught up! Check back later for updates.",
  },
}

export const errorStates = {
  courses: { title: 'Unable to Load Courses', message: 'We had trouble fetching course data. Please check your connection and try again.' },
  users: { title: 'Unable to Load Users', message: 'We encountered an error loading user data. Please try again.' },
  enrollments: { title: 'Unable to Load Enrollments', message: 'Enrollment data could not be retrieved. Please refresh or contact support.' },
  analytics: { title: 'Analytics Unavailable', message: 'We could not load analytics data. This may be a temporary issue.' },
  generic: { title: 'Something Went Wrong', message: 'An unexpected error occurred. Please try again or contact support.' },
}
