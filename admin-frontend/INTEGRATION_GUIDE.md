# Integration Guide - Quick Reference

## Quick Copy-Paste Examples

### 1. Add Metric Cards to Any Page

```jsx
import MetricCard from '@/components/dashboard/MetricCard';
import { Users, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';

export default function MyDashboard() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Key Metrics</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Total Users"
          value="1,245"
          icon={Users}
          status="success"
          trend="+12%"
          onClick={() => navigate('/admin/students')}
        />
        
        <MetricCard
          title="Active Courses"
          value="36"
          icon={BookOpen}
          status="secondary"
          trend="+5%"
          onClick={() => navigate('/admin/courses')}
        />
        
        <MetricCard
          title="Completion Rate"
          value="68%"
          icon={CheckCircle}
          status="success"
          trend="↑ 4%"
        />
        
        <MetricCard
          title="Pending Tasks"
          value="12"
          icon={AlertCircle}
          status="error"
          trend="⚠️ Action needed"
        />
      </div>
    </section>
  );
}
```

---

### 2. Add Quick Action Buttons

```jsx
import QuickActionButtons from '@/components/dashboard/QuickActionButtons';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleQuickAction = (action) => {
    switch(action) {
      case 'create-course':
        navigate('/admin/courses');
        break;
      case 'create-intern':
        navigate('/admin/mentors');
        break;
      case 'approve-pending':
        navigate('/admin/students');
        break;
      case 'view-reports':
        navigate('/admin/dashboard');
        break;
      default:
        break;
    }
  };

  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-bold">Quick Actions</h2>
      <QuickActionButtons onActionClick={handleQuickAction} />
    </section>
  );
}
```

---

### 3. Replace Traditional Form Inputs

#### Before (Old Way)
```jsx
<input
  type="email"
  placeholder="Email"
  onChange={(e) => setEmail(e.target.value)}
/>
```

#### After (New Way with Validation)
```jsx
import FormField from '@/components/form/FormField';

<FormField
  label="Email Address"
  type="email"
  name="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required={true}
/>
```

---

### 4. Create Form with Validation

```jsx
import { useState } from 'react';
import FormField from '@/components/form/FormField';
import FormSubmitButton from '@/components/form/FormSubmitButton';

export default function CreateCourseForm() {
  const [formData, setFormData] = useState({
    courseName: '',
    instructorEmail: '',
    password: '',
    price: '',
    enrollmentLimit: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Your API call here
      const response = await fetch('/api/courses', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Failed to create course');
      // Success toast shows automatically
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6">
      <FormField
        label="Course Name"
        type="text"
        name="courseName"
        value={formData.courseName}
        onChange={handleChange}
        placeholder="e.g., React Mastery"
        required={true}
      />

      <FormField
        label="Instructor Email"
        type="email"
        name="instructorEmail"
        value={formData.instructorEmail}
        onChange={handleChange}
        placeholder="instructor@example.com"
        required={true}
      />

      <FormField
        label="Instructor Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required={true}
      />

      <FormField
        label="Course Price (₹)"
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        minValue={0}
        maxValue={100000}
        required={true}
      />

      <FormField
        label="Enrollment Limit"
        type="number"
        name="enrollmentLimit"
        value={formData.enrollmentLimit}
        onChange={handleChange}
        minValue={1}
        maxValue={1000}
        required={true}
      />

      <FormSubmitButton
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
        loadingText="Creating Course..."
        successMessage="Course created successfully!"
        errorMessage="Failed to create course. Please try again."
        label="Create Course"
        variant="primary"
      />
    </form>
  );
}
```

---

### 5. Use Design Tokens in Styled Components

```jsx
import { colors, spacing, typography, shadows } from '@/constants/designTokens';

export default function StyledComponent() {
  return (
    <div
      style={{
        backgroundColor: colors.primary.light,
        color: colors.primary.dark,
        padding: spacing.md,
        borderRadius: '12px',
        boxShadow: shadows.md,
        marginTop: spacing.lg
      }}
    >
      <h2 style={typography.heading.large}>
        Styled with Design Tokens
      </h2>
      
      <p style={typography.body.base}>
        This ensures consistency across the app
      </p>
    </div>
  );
}
```

---

### 6. File Upload with Validation

```jsx
<FormField
  label="Course Cover Image"
  type="file"
  name="coverImage"
  onChange={handleChange}
  required={true}
  fileOptions={{
    maxSize: 10 * 1024 * 1024,  // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    fieldName: 'Course Cover'
  }}
/>
```

---

### 7. Toast Notifications

```jsx
import {
  showSuccessToast,
  showErrorToast,
  showLoadingToast
} from '@/components/form/FormSubmitButton';

// Success
showSuccessToast('Course created successfully!');

// Error
showErrorToast('Failed to create course.');

// Loading
const id = showLoadingToast('Creating course...');
// Later...
import toast from 'react-hot-toast';
toast.dismiss(id);
```

---

### 8. Validation Utilities (Standalone)

```jsx
import {
  validateEmail,
  validatePassword,
  validateNumber,
  validateFile
} from '@/utils/formValidation';

// Email validation
const emailResult = validateEmail('user@example.com');
console.log(emailResult); // { valid: true, message: "" }

// Password validation with strength meter
const pwResult = validatePassword('MyPassword123!');
console.log(pwResult);
// {
//   valid: true,
//   strength: 'strong',
//   strengthPercent: 80,
//   requirements: [...]
// }

// Number validation with range
const numResult = validateNumber(25, 'Age', 18, 65);
console.log(numResult); // { valid: true, message: "" }

// File validation
const file = new File(['content'], 'image.jpg', { type: 'image/jpeg' });
const fileResult = validateFile(file, {
  maxSize: 5 * 1024 * 1024,
  allowedTypes: ['image/jpeg', 'image/png']
});
console.log(fileResult); // { valid: true, message: "" }
```

---

## Common Scenarios

### Scenario 1: Update Existing Course Page

**Location**: `src/pages/Admin/AdminCoursesPage.jsx`

**What to do**:
1. Add MetricCards at the top showing course stats
2. Add QuickActionButtons for common actions
3. Replace form inputs with FormField components

**Code**:
```jsx
import MetricCard from '@/components/dashboard/MetricCard';
import QuickActionButtons from '@/components/dashboard/QuickActionButtons';
import FormField from '@/components/form/FormField';

export default function AdminCoursesPage() {
  return (
    <div className="space-y-8">
      {/* Metrics Section */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="Total Courses"
            value="36"
            status="secondary"
            icon={BookOpen}
          />
          <MetricCard
            title="Active Enrollments"
            value="1,245"
            status="primary"
            icon={Users}
          />
          <MetricCard
            title="Completion Rate"
            value="68%"
            status="success"
            icon={CheckCircle}
          />
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <QuickActionButtons onActionClick={handleAction} />
      </section>

      {/* Course Form - with validation */}
      <section>
        <FormField
          label="Course Name"
          type="text"
          name="name"
          required={true}
        />
        {/* ... more fields */}
      </section>
    </div>
  );
}
```

---

### Scenario 2: Create Student Registration Form

**Location**: New file or existing form

**What to do**:
1. Use FormField for all inputs
2. Add FormSubmitButton with loading state
3. Show success/error toasts

**Code**:
```jsx
import FormField from '@/components/form/FormField';
import FormSubmitButton from '@/components/form/FormSubmitButton';

export default function StudentRegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form className="space-y-4">
      <FormField
        label="Full Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required={true}
      />

      <FormField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required={true}
      />

      <FormField
        label="Phone"
        type="text"
        name="phone"
        value={formData.phone}
        onChange={(e) => setFormData({...formData, phone: e.target.value})}
        required={true}
      />

      <FormField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        required={true}
      />

      <FormSubmitButton
        onSubmit={async () => {
          const res = await fetch('/api/students', {
            method: 'POST',
            body: JSON.stringify(formData)
          });
          if (!res.ok) throw new Error('Registration failed');
        }}
        isLoading={isSubmitting}
        label="Register Student"
      />
    </form>
  );
}
```

---

### Scenario 3: Add Stats to Event Registration Page

**Location**: `src/pages/Admin/AdminEventRegistrationsPage.jsx`

**What to do**:
1. Fetch event registration metrics
2. Display using MetricCard
3. Show pending approvals with red status

**Code**:
```jsx
import MetricCard from '@/components/dashboard/MetricCard';
import { useEffect, useState } from 'react';

export default function AdminEventRegistrationsPage() {
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    pending: 0,
    approved: 0,
    completed: 0
  });

  useEffect(() => {
    // Fetch stats from API
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const response = await fetch('/api/event-registrations/stats');
    const data = await response.json();
    setStats(data);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Event Registrations</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Total Registrations"
          value={stats.totalRegistrations}
          status="primary"
        />
        <MetricCard
          title="Pending Approval"
          value={stats.pending}
          status="error"
          trend="⚠️ Action needed"
        />
        <MetricCard
          title="Approved"
          value={stats.approved}
          status="success"
        />
        <MetricCard
          title="Completed"
          value={stats.completed}
          status="success"
        />
      </div>

      {/* Rest of the page */}
    </div>
  );
}
```

---

## File Import Paths

```javascript
// Design Tokens
import { colors, spacing, typography, shadows } from '@/constants/designTokens';

// Components
import MetricCard from '@/components/dashboard/MetricCard';
import QuickActionButtons from '@/components/dashboard/QuickActionButtons';
import FormField from '@/components/form/FormField';
import FormSubmitButton, {
  showSuccessToast,
  showErrorToast,
  showLoadingToast
} from '@/components/form/FormSubmitButton';

// Utilities
import {
  validateEmail,
  validatePassword,
  validateRequired,
  validateNumber,
  validateFile,
  formatFileSize
} from '@/utils/formValidation';

// Icons (Lucide)
import { Users, BookOpen, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';

// Notifications
import toast from 'react-hot-toast';
```

---

## Testing Validation

### Email Field Test Cases
```
✓ valid@email.com        → ✓ Valid
✗ invalid.email          → ✗ Invalid
✗ @example.com           → ✗ Invalid
✓ user+tag@example.com   → ✓ Valid
```

### Password Field Test Cases
```
✗ short                  → Very Weak (< 8 chars)
✗ password               → Weak (no upper/number)
✓ Password123            → Strong
✓ Pass123!#$             → Very Strong
```

### Number Field Test Cases
```
Min: 1, Max: 100
✓ 50                     → ✓ Valid
✗ 0                      → ✗ Below minimum
✗ 150                    → ✗ Above maximum
✗ abc                    → ✗ Not a number
```

### File Upload Test Cases
```
Max: 10MB, Types: JPG, PNG
✓ image.jpg (5MB)        → ✓ Valid
✗ image.gif (2MB)        → ✗ Invalid type
✗ video.mp4 (15MB)       → ✗ File too large
✓ photo.png (3MB)        → ✓ Valid
```

---

## Keyboard Shortcuts & Accessibility

- **Tab**: Navigate between form fields
- **Shift+Tab**: Navigate backwards
- **Enter**: Submit form (on button)
- **Space**: Toggle password visibility
- **Escape**: Close file picker (after opening)

---

## Browser Support

✅ Chrome/Edge 90+
✅ Firefox 88+
✅ Safari 14+
✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## Performance Tips

1. **Memoize components** if re-rendering frequently
2. **Use useCallback** for event handlers
3. **Lazy load validation** rules if needed
4. **Debounce onChange** for expensive operations

---

## Troubleshooting

**Q: Validation not working?**
A: Ensure FormField is properly imported and onChange handler is connected.

**Q: Styles not applied?**
A: Check that Tailwind CSS is configured and design tokens are imported.

**Q: Toast not showing?**
A: Verify react-hot-toast is installed and <Toaster /> is in App.jsx

**Q: Icons not rendering?**
A: Ensure lucide-react is installed: `npm install lucide-react`

---

## Next Steps

1. ✅ Copy design tokens usage to your codebase
2. ✅ Replace one form with FormField components
3. ✅ Add MetricCard to one dashboard page
4. ✅ Test validation with different inputs
5. ✅ Add QuickActionButtons to main dashboard
6. ✅ Update remaining forms gradually

---

**Ready to implement?** Start with the simplest integration first! 🚀
