import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  User,
  Key,
  Database,
  Save,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showApiKey, setShowApiKey] = useState(false);
  
  const [settings, setSettings] = useState({
    profile: {
      name: 'Security Analyst',
      email: 'analyst@blockshield.com',
      company: 'BlockShield Security',
      timezone: 'UTC-8'
    },
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      criticalOnly: false,
      weeklyReports: true,
      auditCompleted: true
    },
    security: {
      apiKey: 'bs_sk_1234567890abcdef1234567890abcdef',
      twoFactorAuth: false,
      sessionTimeout: '30',
      ipWhitelist: ''
    },
    preferences: {
      theme: 'dark',
      language: 'en',
      autoRefresh: '30',
      defaultNetwork: 'ethereum',
      riskThreshold: '5'
    }
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'preferences', name: 'Preferences', icon: SettingsIcon },
  ];

  const handleSave = (section: string) => {
    toast.success(`${section} settings saved successfully`);
  };

  const generateNewApiKey = () => {
    const newApiKey = 'bs_sk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        apiKey: newApiKey
      }
    }));
    toast.success('New API key generated');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1">Manage your account and application preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.name}</span>
              </motion.button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 bg-gray-800 rounded-xl p-6 border border-gray-700">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-white">Profile Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={settings.profile.name}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      profile: { ...prev.profile, name: e.target.value }
                    }))}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      profile: { ...prev.profile, email: e.target.value }
                    }))}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                  <input
                    type="text"
                    value={settings.profile.company}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      profile: { ...prev.profile, company: e.target.value }
                    }))}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
                  <select
                    value={settings.profile.timezone}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      profile: { ...prev.profile, timezone: e.target.value }
                    }))}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="UTC-8">UTC-8 (Pacific)</option>
                    <option value="UTC-5">UTC-5 (Eastern)</option>
                    <option value="UTC+0">UTC+0 (GMT)</option>
                    <option value="UTC+1">UTC+1 (CET)</option>
                  </select>
                </div>
              </div>
              
              <button
                onClick={() => handleSave('Profile')}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Save size={20} />
                <span>Save Changes</span>
              </button>
            </motion.div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-white">Notification Settings</h2>
              
              <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {key === 'emailAlerts' && 'Receive email notifications for security alerts'}
                        {key === 'pushNotifications' && 'Enable browser push notifications'}
                        {key === 'criticalOnly' && 'Only receive notifications for critical issues'}
                        {key === 'weeklyReports' && 'Get weekly summary reports via email'}
                        {key === 'auditCompleted' && 'Notify when audit processes are completed'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, [key]: e.target.checked }
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => handleSave('Notification')}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Save size={20} />
                <span>Save Changes</span>
              </button>
            </motion.div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-white">Security Settings</h2>
              
              <div className="space-y-6">
                {/* API Key */}
                <div className="p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-medium flex items-center">
                      <Key size={20} className="mr-2" />
                      API Key
                    </h3>
                    <button
                      onClick={generateNewApiKey}
                      className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Generate New
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      value={settings.security.apiKey}
                      readOnly
                      className="flex-1 px-4 py-2 bg-gray-600 text-white rounded border border-gray-500 font-mono text-sm"
                    />
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="p-2 text-gray-400 hover:text-white"
                    >
                      {showApiKey ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Two-Factor Auth */}
                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Two-Factor Authentication</h3>
                    <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactorAuth}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        security: { ...prev.security, twoFactorAuth: e.target.checked }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Session Timeout */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, sessionTimeout: e.target.value }
                    }))}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* IP Whitelist */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">IP Whitelist</label>
                  <textarea
                    value={settings.security.ipWhitelist}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, ipWhitelist: e.target.value }
                    }))}
                    placeholder="Enter IP addresses (one per line)"
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <button
                onClick={() => handleSave('Security')}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Save size={20} />
                <span>Save Changes</span>
              </button>
            </motion.div>
          )}

          {/* Preferences */}
          {activeTab === 'preferences' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-white">Application Preferences</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
                  <select
                    value={settings.preferences.theme}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, theme: e.target.value }
                    }))}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                  <select
                    value={settings.preferences.language}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, language: e.target.value }
                    }))}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Auto Refresh (seconds)</label>
                  <input
                    type="number"
                    value={settings.preferences.autoRefresh}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, autoRefresh: e.target.value }
                    }))}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Default Network</label>
                  <select
                    value={settings.preferences.defaultNetwork}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, defaultNetwork: e.target.value }
                    }))}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ethereum">Ethereum</option>
                    <option value="bsc">Binance Smart Chain</option>
                    <option value="polygon">Polygon</option>
                    <option value="arbitrum">Arbitrum</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Risk Threshold</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={settings.preferences.riskThreshold}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, riskThreshold: e.target.value }
                    }))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Low (1)</span>
                    <span>Current: {settings.preferences.riskThreshold}</span>
                    <span>High (10)</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => handleSave('Preferences')}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Save size={20} />
                <span>Save Changes</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;