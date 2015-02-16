var Dog = Dog ||
{};

Dog.Main = (function()
{
	var form;

	var setup = function()
	{
		form = document.getElementById('howManyWindowsForm');

		form.onsubmit = function(event)
		{
			event.preventDefault();

			var howManyWindows = parseInt(document.getElementById('howManyWindows').value);

			if (typeof(howManyWindows) !== 'number')
			{
				alert('Not a valid Number!');
			}
			else
			{
				chrome.tabs.getSelected(null, function(tab)
				{
					for (var i = 0; i < howManyWindows; i++)
					{
						var newTop = (i + 1) * 20;
						var newLeft = (i + 1) * 20;
						chrome.windows.create(
						{
							url: tab.url,
							width: 100,
							height: 100,
							top: newTop,
							left: newLeft
						});
					};
				});
			}
		}
	};

	return {
		init: function()
		{
			setup();
		}
	};
})();

document.onreadystatechange = function()
{
	if (document.readyState === 'complete')
	{
		Dog.Main.init();
	}
};